"""Import published text and safe markup; discard scripts, styles and private content."""
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from html import escape,unescape
from urllib.parse import urlsplit
from pathlib import Path
import json,sys,re
ns={'w':'http://wordpress.org/export/1.2/','c':'http://purl.org/rss/1.0/modules/content/'}
class Safe(HTMLParser):
 allowed={'p','div','br','h1','h2','h3','h4','h5','h6','strong','b','em','i','ul','ol','li','a','blockquote','figure','img'}
 def __init__(self):super().__init__();self.output=[];self.skip=0
 def handle_starttag(self,t,a):
  if t in ['script','style','iframe','object']:self.skip+=1;return
  if self.skip or t not in self.allowed:return
  attrs=dict(a);parts=[]
  if t=='a':
   u=attrs.get('href','');v=urlsplit(u)
   if v.hostname in ['nairobicentralhardware.com','www.nairobicentralhardware.com']:u=v.path+('?' + v.query if v.query else '')
   if u and urlsplit(u).scheme in ['','https','http','mailto','tel'] and not u.startswith('//'):parts.append('href="'+escape(u,quote=True)+'"')
  if t=='img':
   u=attrs.get('src','').replace('http://nairobicentralhardware.com/','https://nairobicentralhardware.com/')
   if urlsplit(u).hostname!='nairobicentralhardware.com':return
   parts=['src="'+escape(u,quote=True)+'"','alt="'+escape(attrs.get('alt',''),quote=True)+'"','loading="lazy"']
  self.output.append('<'+t+(' '+' '.join(parts) if parts else '')+'>')
 def handle_endtag(self,t):
  if t in ['script','style','iframe','object']:self.skip=max(0,self.skip-1);return
  if not self.skip and t in self.allowed and t not in ['img','br']:self.output.append('</'+t+'>')
 def handle_data(self,d):
  if not self.skip:self.output.append(escape(re.sub(r'\[wpforms[^\]]*\]','',d)))
r=ET.parse(sys.argv[1]);pages=[]
for i in r.findall('./channel/item'):
 if i.findtext('w:status',namespaces=ns)!='publish' or i.findtext('w:post_type',namespaces=ns) not in ['page','post']:continue
 p=Safe();p.feed(i.findtext('c:encoded',default='',namespaces=ns))
 pages.append({'title':unescape(i.findtext('title')),'path':urlsplit(i.findtext('link')).path,'type':i.findtext('w:post_type',namespaces=ns),'html':''.join(p.output)})
Path(__file__).resolve().parents[1].joinpath('src/pages.json').write_text(json.dumps(pages,indent=2)+'\n')
print('Imported',len(pages),'published pages/posts')
