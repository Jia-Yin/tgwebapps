import base64
import urllib.parse

def encodeMD(text):
    qstr = urllib.parse.quote(text)
    qstr = base64.urlsafe_b64encode(bytes(qstr, 'utf-8'))
    return qstr.decode('utf-8')

def makeCode(code, lang):
    return f"```{lang}\n{code}\n```"

code = """
#include <stdio.h> // 中文注釋

int main()
{
    printf("Hello world");
    return 0;
}
"""
print(encodeMD("My code is\n" + makeCode(code, 'c')))

