def quote(text):
    return '"' + text + '"'

def number(text):
    num = text.replace(u'\xa0', ' ').split(' ')[0].strip()
    if num.endswith(','):
        print('removing extra comma from:', quote(text))
        num = num[:-1]
    if num.endswith('-Managing'):
        print('fixing malformed entry for:', quote(text))
        num = num[:-(len('-Managing'))]
    nums = []
    firstNum = num.split('/')[0].strip()
    if len(firstNum) < 6:
        print('malformed entry:', quote(text) + ';', 'assuming it to be 76453: Literature of Empire')
        return ['76453'] # Literature of Empire
    for n in num.split('/'):
        n = n.strip()
        num_with_dash = firstNum[:6-len(n)] + n
        nums.append(num_with_dash[:2] + num_with_dash[3:])
    return nums

def name(text):
    name = text.replace(u'\xa0', ' ').split(' ')
    if name[0] == '76':
        print('fixing malformed entry:', quote(text))
        name.pop(0)
    name.pop(0)
    return (' '.join(name)).strip()
