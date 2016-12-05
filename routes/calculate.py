import numpy as np
import sys
import json
x = np.array(json.loads(sys.argv[1]))
y = np.array(json.loads(sys.argv[2]))
p = json.loads(sys.argv[3])
z = np.polyfit(x,y,p)
y2 = []
square_sum = 0
'''for yy in y:
    tmp = np.ployval(z,yy)
    square_sum += (yy - tmp)*(yy - tmp)
    y2.append(tmp)
print y2
print square_sum'''
print json.dumps(list(z))