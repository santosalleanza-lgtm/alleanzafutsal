"""Pós-processa a cópia estática do site (wget --mirror de `next start`) para abrir direto do arquivo.

Uso: python3 scripts/fix-static-export.py <pasta-do-site>
- troca /_next/image por caminhos diretos e remove srcset/srcSet
- embute as fontes no CSS (file:// bloqueia fontes)
- injeta script que corrige imagens reescritas pelo JS e faz os links internos navegarem para os .html
"""
import re, glob, base64, os, sys, urllib.parse as up
root = sys.argv[1]; os.chdir(root)
# 1) imagens: src direto e sem srcset/srcSet
for f in glob.glob('**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read(); pre = '../' * f.count('/')
    def rep(m):
        u = m.group(1)
        for _ in range(3): u = up.unquote(u)
        return 'src="' + pre + u.lstrip('/') + '"'
    s = re.sub(r'src="[^"]*?_next/image(?:\\?|%3F)url=([^&"]*)[^"]*"', rep, s)
    s = re.sub(r'\s(?:srcset|imagesrcset)="[^"]*"', '', s, flags=re.I)
    s = re.sub(r'<link rel="preload" as="image"[^>]*>', '', s)
    s = re.sub(r'src="/(?!/)', 'src="' + pre, s)
    open(f, 'w', encoding='utf-8').write(s)
# 2) fontes embutidas no CSS (file:// bloqueia fontes externas)
for css in glob.glob('_next/static/css/*.css'):
    s = open(css, encoding='utf-8').read()
    def emb(m):
        p = os.path.normpath(os.path.join(os.path.dirname(css), m.group(1)))
        if not os.path.exists(p):
            p = m.group(1).lstrip('/')
        if not os.path.exists(p): return m.group(0)
        return 'url(data:font/woff2;base64,' + base64.b64encode(open(p, 'rb').read()).decode() + ')'
    s = re.sub(r'url\(([^)]+?\.woff2)\)', emb, s)
    open(css, 'w', encoding='utf-8').write(s)
# 3) remove preload de fontes e injeta correção para imagens reescritas pelo JS no navegador
FIX = """<script>(function(){var P=%s;function f(i){var s=i.getAttribute('src')||'';var m=s.match(/_next\\/image\\?url=([^&]+)/);if(m){i.setAttribute('src',P+decodeURIComponent(m[1]).replace(/^\\//,''));}else if(/^\\/[^\\/]/.test(s)){i.setAttribute('src',P+s.slice(1));}if(i.hasAttribute('srcset'))i.removeAttribute('srcset');}function all(){document.querySelectorAll('img').forEach(f);document.querySelectorAll('link[as=font]').forEach(function(l){l.remove();});}new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='attributes')f(m.target);else m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.tagName==='IMG')f(n);else if(n.querySelectorAll)n.querySelectorAll('img').forEach(f);}});});}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcset']});document.addEventListener('DOMContentLoaded',all);window.addEventListener('click',function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a||(a.target&&a.target!=='_self'))return;var h=a.getAttribute('href');if(/^(https?:|mailto:|tel:|whatsapp:|#|javascript:)/i.test(h))return;e.preventDefault();e.stopImmediatePropagation();if(/^\\/(?!\\/)/.test(h)){var m=h.match(/^([^?#]*)(?:\\?[^#]*)?(#.*)?$/);var path=m[1].replace(/^\\/|\\/$/g,'');h=P+(path?path+'.html':'index.html')+(m[2]||'');}location.href=h;},true);})();</script>"""
for f in glob.glob('**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read(); pre = '../' * f.count('/')
    s = re.sub(r'<link rel="preload"[^>]*as="font"[^>]*/?>', '', s)
    if 'data-static-fix' not in s:
        s = s.replace('<head>', '<head><meta name="x" data-static-fix="1"/>' + FIX % repr(pre), 1)
    open(f, 'w', encoding='utf-8').write(s)
