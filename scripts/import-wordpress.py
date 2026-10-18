"""Extract only the published product list and public media references; never execute export content."""
import sys, json, re, hashlib, html
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
ns={'wp':'http://wordpress.org/export/1.2/','content':'http://purl.org/rss/1.0/modules/content/'}
root=ET.parse(sys.argv[1]).getroot()
items=root.findall('./channel/item')
page=next(i for i in items if i.findtext('title')=='Products' and i.findtext('wp:status',namespaces=ns)=='publish')
class CatalogueParser(HTMLParser):
 def __init__(self):
  super().__init__(); self.category=None;self.capture=None;self.parts=[];self.rows=[]
 def handle_starttag(self,tag,attrs):
  if tag=='a' and dict(attrs).get('tabindex')=='0':self.capture='category';self.parts=[]
  if tag=='li' and self.category:self.capture='product';self.parts=[]
 def handle_data(self,data):
  if self.capture:self.parts.append(data)
 def handle_endtag(self,tag):
  if (tag=='a' and self.capture=='category') or (tag=='li' and self.capture=='product'):
   text=' '.join(''.join(self.parts).split())
   if self.capture=='category':self.category=text
   elif text:self.rows.append((self.category,text))
   self.capture=None
parser=CatalogueParser();parser.feed(page.findtext('content:encoded',namespaces=ns))
rows=list(dict.fromkeys(parser.rows))
products=[{'id':hashlib.sha256((cat+'|'+name).encode()).hexdigest()[:12], 'name':name,'category':cat,'note':'Contact us for sizes, options, and availability.'} for cat,name in rows]
base=Path(__file__).resolve().parents[1]
(base/'src/products.json').write_text(json.dumps(products,indent=2,ensure_ascii=False)+'\n')
media=[{'title':i.findtext('title') or '', 'url':i.findtext('wp:attachment_url',namespaces=ns)} for i in items if i.findtext('wp:post_type',namespaces=ns)=='attachment']
(base/'docs/media-manifest.json').write_text(json.dumps(media,indent=2)+'\n')
print(f'{len(products)} catalogue entries across {len(set(cat for cat,name in rows))} categories; {len(parser.rows)-len(rows)} repeated entries removed within categories. {len(media)} media references.')
