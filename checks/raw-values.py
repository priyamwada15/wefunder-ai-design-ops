import re,sys,json
s=open(sys.argv[1]).read()
css=' '.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',s))
css=re.sub(r'/\*[\s\S]*?\*/','',css)
css=re.sub(r':root\s*\{[\s\S]*?\}','',css)
inline=' '.join(re.findall(r'style="([^"]*)"',s))
body=css+' ; '+inline
issues=[]
for prop,val in re.findall(r'(color|background(?:-color)?|border(?:-color)?|fill|stroke|font-size|border-radius|font-weight)\s*:\s*([^;}{]+)',body):
    v=val.strip()
    if 'var(' in v or v in ('none','transparent','inherit','currentColor','currentcolor','0','0px','initial','unset'): continue
    if prop.startswith('background') and '#e4e9f2' in v.lower(): continue
    if prop in('fill','stroke') and v in ('none','currentColor','currentcolor'): continue
    if prop=='font-weight': continue
    if prop.startswith('border') and prop!='border-radius' and not re.search(r'#|rgb|oklch|hsl',v): continue
    if re.search(r'#[0-9a-fA-F]{3,8}|rgb|oklch|hsl|\d+px|\d*\.?\d+rem|\d+%',v) or prop in('color',):
        issues.append(f'{prop}: {v}')
print(json.dumps(issues[:12]),len(issues))
