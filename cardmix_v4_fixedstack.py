# cardmix version 3
# csv export

# imports
import sys
from collections import deque  # needed for popleft
import datetime

a = datetime.datetime.now()


try:
    d = open("analyse.csv","w")
except:
    print("Datei [analyse.csv] nicht vorhanden. Bitte erstellen Sie die Datei und versuchen Sie es erneut.")
    sys.exit(0)


d.write("Anzahl Karten" + ";" + "Druchmischen" + ";" + "\n")

even_input = 0

while even_input == 0:
    # m = input("How many cardstacks do you want to mix?: ")
    # m = int(m)
    m = 500
    if m % 2 == 0 and m >= 2:
        even_input = 1
    else:
        even_input = 0

print("Mische jeden Stapel mit bis zu "+str(m)+" Karten");
# n is the smallest size of cardstack
# n = 2

for n in range(2, (m+1), 2):

    # definition of stacks
    original_stack = []
    mixed_stack = []

    #  i = 1  # helping index for loop
    # x = 1  # helping index for loop
    counter = 0  # count how many times stacks get mixed

    # todo: prove performance of while vs. for-loop to fill original stack
    # fill original stack with values, needed for comparing mixed and original
    #  while i <= n:
    for i in range(1, (n+1), 1):
        original_stack.append(i)
        #  i += 1

    while not original_stack == mixed_stack:

        if len(mixed_stack) == 0:
            mixed_stack = list(original_stack)

        # mixed stack gets separated into 2 stacks
        temp_list = []
        bottom_stack = []
        top_stack = []

        temp_list = deque(mixed_stack)
        #  x = 1
        length_mixed_stack = len(mixed_stack)

        #  while x <= len(mixed_stack):  # move len(mixed_stack) into single variable to preserve runtime perf
        for x in range(1, (length_mixed_stack + 1), 1):
            if x <= n / 2:
                bottom_stack.append(temp_list.popleft())
            else:
                top_stack.append(temp_list.popleft())
            #  x += 1


        # clear counting-variables and mixed_stack
        mixed_stack = []
        temp_list_bottom = []
        temp_list_top = []

        temp_list_bottom = deque(bottom_stack)
        temp_list_top = deque(top_stack)
        y = 1
        while y <= n / 2:
            mixed_stack.append(temp_list_bottom.popleft())
            mixed_stack.append(temp_list_top.popleft())
            y += 1

        counter += 1

    # print(str(counter) + " mal Mischen bei " +  str(n)  + " Karten")
    d.write(str(n) + ";" + str(counter) + ";" + "\n")

    #  n = n + 2

# Datei wird geschlossen
d.close()
b = datetime.datetime.now()
c = b - a
print("Der Durchgang dauerte: " + str(c) + " Sekunden")
