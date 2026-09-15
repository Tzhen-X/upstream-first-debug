"""Validate and build both instruction-only distributions. Never publishes."""
from pathlib import Path
import argparse
import hashlib
import json
import re
import zipfile

ROOT=Path(__file__).resolve().parents[1]
NAMES=('upstream-first-debug','dsh-upstream-first-debug')
SHARED=('LICENSE','SOURCES.md','VALIDATION.md','examples.md')

def read_skill(name):
    text=(ROOT/'skills'/name/'SKILL.md').read_text(encoding='utf-8')
    parts=text.split('---',2)
    if len(parts)!=3 or parts[0].strip(): raise ValueError('Invalid frontmatter')
    fields=dict(line.split(':',1) for line in parts[1].strip().splitlines())
    if fields.get('name','').strip()!=name: raise ValueError('Name mismatch')
    if not re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*',name): raise ValueError('Invalid name')
    if not fields.get('description','').strip(): raise ValueError('Missing description')
    return text,parts[2]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sync-dsh',action='store_true')
    parser.add_argument('--check-only',action='store_true')
    args=parser.parse_args()
    common,body=read_skill(NAMES[0])
    if args.sync_dsh:
        dest=ROOT/'skills'/NAMES[1]/'SKILL.md'
        derived=common.replace('name: upstream-first-debug\n','name: dsh-upstream-first-debug\n',1).replace('description: 社区开源工具','description: 在 DeepSeek Harness（DSH）中，社区开源工具',1)
        dest.write_text(derived,encoding='utf-8',newline='\n')
    if read_skill(NAMES[1])[1]!=body: raise ValueError('Instruction bodies have drifted')
    license_text=(ROOT/'LICENSE').read_text(encoding='utf-8')
    if 'Copyright (c) 2026 Tzhen' not in license_text: raise ValueError('Unexpected attribution')
    version=(ROOT/'VERSION').read_text(encoding='utf-8').strip()
    if not re.fullmatch(r'\d+\.\d+\.\d+(?:-[a-z0-9.]+)?',version): raise ValueError('Invalid version')
    result={'version':version,'instruction_bodies_equal':True,'archives':[]}
    if not args.check_only:
        dest=ROOT/'dist'
        dest.mkdir(exist_ok=True)
        for name in NAMES:
            files={f'{name}/SKILL.md':ROOT/'skills'/name/'SKILL.md',f'{name}/README.md':ROOT/'skills'/name/'README.md'}
            files.update({f'{name}/{n}':ROOT/n for n in SHARED})
            archive=dest/f'{name}-{version}.zip'
            with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED) as z:
                for entry,source in sorted(files.items()):
                    info=zipfile.ZipInfo(entry,date_time=(2026,9,15,0,0,0))
                    info.compress_type=zipfile.ZIP_DEFLATED
                    info.external_attr=0o100644<<16
                    z.writestr(info,source.read_bytes())
            with zipfile.ZipFile(archive) as z:
                if z.testzip() is not None or set(z.namelist())!=set(files): raise ValueError('ZIP verification failed')
                for n,p in files.items():
                    if z.read(n)!=p.read_bytes(): raise ValueError('Packaged bytes differ')
            result['archives'].append({'file':archive.name,'files':len(files),'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()})
        (dest/'manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__=='__main__': main()
