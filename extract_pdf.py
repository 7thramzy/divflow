import sys
import subprocess

try:
    import pdfplumber
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfplumber"])
    import pdfplumber

with pdfplumber.open('توثيق مشروع إدارة المهام DivFlow - مستندات Google.pdf') as pdf:
    text = '\n'.join([p.extract_text() or '' for p in pdf.pages])
    with open('pdf_content.txt', 'w', encoding='utf-8') as f:
        f.write(text)
