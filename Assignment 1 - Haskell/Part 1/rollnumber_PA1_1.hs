-----------------------------------------------------------------------------
-- Counting Sort
-- CS 300 Spring 2022 Assignment 1 Part 1
-- Deadline: Monday, 7th February 2022
-- 
-- Please press alt Z to enable Word Wrap
-- 
-- Guidelines:  
-- The assignment is based on counting sort algorithm
-- Feel free to make any helper functions where ever you need them
-- Do not show your code or make it accessible to anyone other than the course staff
-- The arguments and return types of the functions should not be changed
-----------------------------------------------------------------------------



-- Question 1: CountOccurance function take in 2 arguments, an integer and a list, and returns the number of times the integer exists in the list.
countOccurance :: Int -> [Int] -> Int


-- Question 2: The maxOf function returns the maximum integer present in the list.
maxOf :: Ord a => [a] -> a



-- Question 3: The indexArray function takes an integer and returns a list of integers from 0 till that integer (inclusive)
indexArray :: Int -> [Int]



-- Question 4: The makeCountArray function takes in 2 lists, array1 and array2 where array1 can be a list with any numbers and array2 will specifically be an array consisting elements from 0 till maximum of array1 in ascending order. For now you can safely assume that array2 will be always correct and according to the format
-- example array1 = [0,1,2,1,1,2,3] array2 = [0,1,2,3] --> return [1,3,2,1] -- explanation: 0 exists 1 time, 1 exists 3 times and so on..
makeCountArray :: [Int] -> [Int] -> [Int]



-- Question 5: makePairs takes in 2 integer lists and returns a list of tuples by combining both of the arrays. 
-- Example [1,2,3,4] and [4,3,2,1] -> returns [(1,4),(2,3), (3,2), (4,1)] 
makePairs :: [Int] -> [Int] -> [] (Int,Int)



-- Question 6: CountingSort function takes in an array and uses the above functions to sort the array using counting sort technique. Feel free to use any helper functions according to your needs.
countingSort :: [Int] -> [Int]




-----------------------------------------------------------------------------
-- The End :)
-----------------------------------------------------------------------------





