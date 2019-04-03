def number(text):
    num = text.replace(u'\xa0', ' ').split(' ')[0].strip()
    if num.endswith(','): num = num[:-1] # inconsistent formatting in page
    if num.endswith('-Managing'): num = num[:-(len('-Managing'))] # Managing Across Culture, PPC
    nums = []
    firstNum = num.split('/')[0].strip()
    if len(firstNum) < 6: return ['76453'] # Literature of Empire
    for n in num.split('/'):
        n = n.strip()
        num_with_dash = firstNum[:6-len(n)] + n
        nums.append(num_with_dash[:2] + num_with_dash[3:])
    return nums

def name(text):
    name = text.replace(u'\xa0', ' ').split(' ')
    if name[0] == '76': name.pop(0)
    name.pop(0)
    return (' '.join(name)).strip()
