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
countOccurance = \num -> \list ->
    case list of
        [] -> 0
        x:xs | x == num -> 1+countOccurance num xs
        x:xs | x /= num -> countOccurance num xs

-- Question 2: The maxOf function returns the maximum integer present in the list.
maxOf :: Ord a => [a] -> a
maxOf = \list ->
    case list of
        [] -> error "No element found"
        [x] -> x
        x:xs | x > maxOf xs -> x
        x:xs -> maxOf xs

-- Question 3: The indexArray function takes an integer and returns a list of integers from 0 till that integer (inclusive)
indexArray :: Int -> [Int]
indexArray = \num ->
    case num of
        x | x == 0 -> [0]
        x -> (indexArray (x-1)) ++ [x]

-- indexArray = \num ->
--     take (num+1) [0,1..]


-- Question 4: The makeCountArray function takes in 2 lists, array1 and array2 where array1 can be a list with any numbers and array2 will specifically be an array consisting elements from 0 till maximum of array1 in ascending order. For now you can safely assume that array2 will be always correct and according to the format
-- example array1 = [0,1,2,1,1,2,3] array2 = [0,1,2,3] --> return [1,3,2,1] -- explanation: 0 exists 1 time, 1 exists 3 times and so on..
makeCountArray :: [Int] -> [Int] -> [Int]
makeCountArray = \array1 -> \array2 ->
    case array2 of
        [] -> []
        x:xs -> [countOccurance x array1] ++ makeCountArray array1 xs


-- Question 5: makePairs takes in 2 integer lists and returns a list of tuples by combining both of the arrays.
-- Example [1,2,3,4] and [4,3,2,1] -> returns [(1,4),(2,3), (3,2), (4,1)]
makePairs :: [Int] -> [Int] -> [] (Int,Int)
makePairs = \list1 -> \list2 ->
    case list1 of
        [] -> []
        x:xs ->
            case list2 of
                [] -> []
                y:ys -> [(x,y)] ++ makePairs xs ys


-- Question 6: CountingSort function takes in an array and uses the above functions to sort the array using counting sort technique. Feel free to use any helper functions according to your needs.
-- helper function

generate :: [Int] -> Int -> [Int]
generate = \list -> \num ->
    case list of
        [] -> []
        x:xs | x == 0 -> generate xs (num+1)
        x:xs -> num:generate ((x-1):xs) num

countingSort :: [Int] -> [Int]
countingSort = \list ->
    case list of
        [] -> []
        x:xs ->
            let indexarray = indexArray (maxOf list)
                countarray = makeCountArray list indexarray
            in generate countarray 0

-----------------------------------------------------------------------------
-- The End :)
-----------------------------------------------------------------------------





