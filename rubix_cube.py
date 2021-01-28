# One approach could be to have a 6 x 9 2D array, with the 6 being sides of the cube and the 9 being the colour squares. 
# Then define rules for how the squares change (should be able to generalise these as they all follow the same pattern on different sides).
# Then have a function to output to a net representation, before we have the 3D stuff done. 

import random
import numpy as np
from enum import Enum

SIDES_OF_CUBE = 6
SQUARES_ON_SIDE = 9

class Colour(Enum):
    red = 1
    orange = 2
    blue = 3
    green = 4
    yellow = 5
    white = 6

class RubixCube:

    def __init__(self):
        total_squares = SIDES_OF_CUBE * SQUARES_ON_SIDE
        rand_sequence = random.sample(range(total_squares), total_squares)
        rand_enum_values = np.array(list(map(lambda value : (value % SIDES_OF_CUBE) + 1, rand_sequence))) # TODO: must be a less crappy way of doing this
        self.cube = rand_enum_values.reshape(6, 9)

    # position = top, bottom, left, right
    # direction = up/down/left/right? (needs more thinking)
    def move(self, position, direction):
        print('TODO')

    def get_cube(self):
        flattened_cube = self.cube.flatten()
        print(flattened_cube)
        get_colour = lambda value : Colour(value).name
        colours = np.array([get_colour(value) for value in flattened_cube])
        return colours.reshape(6, 9)

    # def get_colour(self, value):

        
# Maybe 3D should be worked on first? Otherwise it will be difficult to reason with this when trying different algorithms. 

my_cube = RubixCube()
print(my_cube.get_cube())
