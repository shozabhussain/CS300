-----------------------------------------------------------------------------
-- CS 300 Spring 2022 Module Exam -  Haskell
-- Deadline: 4:30 PM Saturday, 19th Feb.
-- 
-- Please press alt Z to enable Word Wrap
-- 
-- Guidelines:  
-- There are a total of 9 questions
-- Read the questions and their examples carefully!
-- Feel free to make any helper functions where ever you need them.
-- The arguments and return types of the functions should not be changed
-- The following built-in functions are allowed: map, filter, mod, rem, elem, head, tail, takes, drop, length.
-- Total Marks (40) 
-----------------------------------------------------------------------------




data Tree a = Nil | Node (Tree a) (Tree a) a

--Following functions will allow you to print a binary tree:

helpPrint:: Int -> String
helpPrint= \arg -> 
    case arg of
        x | x==0 -> ""
        _ -> "\n" ++ concat (replicate (arg-1) "|   ") ++ "+---"
 

showTree :: (Show a) => Tree a -> Int -> String
showTree = \t -> \ind ->
    case t of
        (Node l r val) ->   
            (helpPrint ind) ++ (show val) ++ (showTree l (ind+1)) ++ (showTree r (ind+1)) 
        _ -> ""

       
instance Show a => Show (Tree a) where
    show = \t ->
        showTree t 0 




-- Question 1: (3 Marks)
-- You are given with a list containing k lists, where each list is sorted in descending order. You must merge all the lists and return one sorted list in ascending order.

-- Example:
-- Input List -> [[5,1],[9,7,2],[11,10,8]]
-- Output -> [1,2,5,7,8,9,10,11]

merge :: [Int] -> [Int] -> [Int]
merge = \s1 -> \s2 ->
    case s1 of
        [] -> s2 
        x:xs -> 
            case s2 of
                y:ys | y>x -> y:(merge s1 ys)
                _ -> x:(merge xs s2)

reverseList :: [Int] -> [Int]
reverseList = \list ->
    case list of 
        [] -> []
        x:xs -> reverseList xs ++ [x] 

mergeKSortedLists :: [[Int]] -> [Int] 
mergeKSortedLists = \lists ->
    case lists of 
        x:y:xs -> reverseList (mergeKSortedLists ((merge x y):xs))
        [x] -> reverseList x
        _ -> []

-- Question 2: (3 Marks)
-- Given an M * N Matrix, you need to find all possible paths from the first element of the first row to the last element of the last row (same as first cell to the last cell). Please note that you can only move down or right and NOT diagonally. 

-- Example:
-- Input:
-- [[9,8,7],
--  [6,5,4],
--  [3,2,1]]

-- Output:
-- [[9,8,7,4,1]
--  [9,8,5,4,1]
--  [9,8,5,2,1]
--  [9,6,5,4,1]
--  [9,6,5,2,1]
--  [9,6,3,2,1]]

findMatrixPaths :: [[Int]] -> [[Int]]
findMatrixPaths = \mat ->
    case mat of
        [[]] -> []
        x | length x == 1 -> x
        x:xs | length xs == 1 -> joinPaths 1 x xs
        row:remaining -> joinPaths 1 row (findMatrixPaths remaining) 

joinPathsHelper ::Int -> [Int] -> [[Int]] -> [[Int]]
joinPathsHelper = \num -> \row -> \remain ->
    case remain of
        [] -> []
        x:xs -> ((take num row) ++ (drop (num-1) x)):(joinPathsHelper num row xs)

joinPaths :: Int -> [Int] -> [[Int]] -> [[Int]]
joinPaths = \num -> \row -> \prevPaths ->
    case num of
        x | x == (length row) -> (joinPathsHelper num row prevPaths)
        x | x /= (length row) -> (joinPathsHelper num row prevPaths) ++ joinPaths (num+1) row (removeLast prevPaths)

removeLast :: [[Int]] -> [[Int]]
removeLast = \lists ->
    case lists of
        [[]] -> []
        x | (length x) == 1 -> x
        x:[] -> [] 
        x:xs -> x:removeLast xs


-- Question 3: (3 Marks)
-- Given a list of Ints, write a function that removes the consecutive elements that sum to 0. Please note that there will always be 1 consecutive sequence in the list that sums to 0 (cannot be more than 1).
-- Example
-- Input: [1,4,5,-4,-1,10]
-- Output: [1,4,10]

deadlyZeroChain :: [Int] -> [Int]
deadlyZeroChain = \og ->
    case og of 
        [] -> []
        x:xs -> 
            let seqToRemove = deadlyHelper og 0
            in removeSequence seqToRemove og


removeSequence :: [Int] -> [Int] -> [Int]
removeSequence = \remove -> \og -> 
    case og of
        [] -> [] 
        x:xs ->
            case remove of
                [] -> og
                y:ys | y == x -> removeSequence ys xs
                _ -> x:removeSequence remove xs
 
deadlyHelper :: [Int] -> Int -> [Int]
deadlyHelper = \list -> \compare -> 
    case list of 
        [] -> []
        x:xs | (extractSequence 1 list compare) == [] -> deadlyHelper xs compare
        _ -> extractSequence 1 list compare

extractSequence :: Int -> [Int] -> Int -> [Int]
extractSequence = \num -> \list -> \compare -> 
    case list of
        x:xs | num == (length list) && sumList ((take num list)) /= compare -> []
        x:xs | sumList ((take num list)) == compare -> (take num list)
        x:xs -> extractSequence (num+1) list compare

sumList :: [Int] -> Int
sumList = \list ->
    case list of
        [] -> 0
        x:xs -> x + sumList xs

-- Question 4: Map function (3 Marks)

--Using the map function in Haskell, write a function that maps a function over lists of lists of lists.  

-- Example1: 
-- Parameter-1 = (\x->x+1) 
-- Parameter-2 = [[[4,5], [6,7]]] 
-- Output = [[[5,6],[7,8]]] 

-- Example2: 
-- Parameter-1 = (\x->x^2) 
-- Parameter-2 = [[[1,2], [3,4]], [[5,6,7], [8]]]
-- Output = [[[1,4],[9,16]],[[25,36,49],[64]]]


map3 :: (a -> b) -> [[[a]]] -> [[[b]]]
map3 = \fn -> \lists -> 
    case lists of
        [[[]]] -> [[[]]]
        x:xs -> (map2 fn x): map3 fn xs
        _ -> []


map2 :: (a -> b) -> [[a]] -> [[b]]
map2 = \fn -> \lists -> 
    case lists of
        [[]] -> [[]]
        x:xs -> (map fn x): map2 fn xs
        _ -> []



-- Question 5: Sublist (4 Marks)
--Define a function that when given two lists decides if all the elements in the first list are chosen from the second list. An element from the second list can be chosen only once. 

-- Example 1: 
-- list 1 = [1,2,4]
-- list 2 = [4,1,2,5,6]
-- Output = True

-- Example 2: 
-- list 1 = [7,2,4,7]
-- list 2 = [1,2,4,6,7]
-- Output = False


isSublist:: [Int] -> [Int] -> Bool
isSublist = \s1 -> \s2 ->
    case s1 of
        [] -> True 
        x:xs | s2 == [] -> False
        x:xs | (chosenOrNot s1 s2) == True && (ifDuplicate s1) == False -> True
        _ -> False 


ifDuplicate :: [Int] -> Bool
ifDuplicate = \list ->
    case list of
        [] -> False
        x:xs | (elem x xs) == True -> True
        x:xs | (elem x xs) == False -> ifDuplicate xs

chosenOrNot :: [Int] -> [Int] -> Bool
chosenOrNot = \s1 -> \s2 ->
    case s1 of
        [] -> True
        x:xs | (elem x s2) == True -> chosenOrNot xs s2
        x:xs | (elem x s2) == False -> False


-- Question 6: (5 Marks)
-- Given a binary tree and an integer n, write a function that returns a list of paths that sum to the integer n. However, a path may start from any node of the tree but has to end on the leaf node!

-- Input: 
-- Tree: 
-- 1
-- +---2    
-- |   +---11
-- |   +---5
-- +---3    
-- |   +---8
-- |   +---7

-- N = 11

-- Output: [[1,3,7], [3,8], [11]]

checkTree :: Tree Int
checkTree = Node (Node (Node Nil Nil 11) (Node Nil Nil 5) 2) (Node (Node Nil Nil 8) (Node Nil Nil 7) 3) 1

extractPaths :: Int -> [[Int]] -> [[Int]]
extractPaths = \ num -> \list ->
    case list of
        [] -> []
        x:xs -> (pathsHelper1 0 num x):extractPaths num xs 

allPaths :: Tree Int -> [[Int]]
allPaths = \tree -> 
    case tree of 
        Node Nil Nil x -> [[x]]
        Node left right x -> 
            let leftPaths = allPaths left
                rightPaths = allPaths right
                allpaths = leftPaths ++ rightPaths
                answer = (combinePath x allpaths)
            in answer

combinePath:: Int -> [[Int]] -> [[Int]]
combinePath = \num -> \lists ->
    case lists of 
        [[]] -> []
        x:xs -> [(num:x)] ++ (combinePath num xs)
        _ -> []

countPaths :: Tree Int -> Int -> [[Int]]
countPaths = \tree -> \num -> filterLists (extractPaths num (allPaths tree))

filterLists :: [[Int]] -> [[Int]]
filterLists = \lists ->
    case lists of
        [[]] -> []
        x:xs | x == [] -> filterLists xs
        x:xs -> x: filterLists xs
        _ -> []

pathsHelper1 :: Int -> Int -> [Int] -> [Int]
pathsHelper1 = \counter -> \compare -> \list -> 
    case list of 
        x:xs | counter == length list -> []
        x:xs | sumList (drop counter list) == compare -> drop counter list
        _ -> pathsHelper1 (counter+1) compare list

-- Question 7: (5 Marks)
--  Given a binary tree, write a function that returns a list (in the correct order) containing the number of nodes at each level of the binary tree.

-- Example 1:
-- Input Tree:
-- 6
-- +---4     
-- |   +---2 
-- |   +---5 
-- +---9     
-- |   +---8 
-- |   +---11
-- Ouput: [1,2,4]

-- Example 2:
-- Input Tree:
-- 6
-- +---4
-- |   +---16    
-- |   |   +---12
-- |   |   +---15
-- |   +---22
-- |   |   +---26
-- |   |   +---55
-- +---9
-- |   +---8
-- |   |   +---12
-- |   |   +---13
-- Output : [1,2,3,6]
checkTree7 :: Tree Int
checkTree7 = Node (Node (Node Nil Nil 16) (Node Nil Nil 22) 4) (Node (Node Nil Nil 8) Nil 9) 6

getNodes :: Tree Int -> Int
getNodes = \tree -> 
    case tree of
        Nil -> 0
        Node Nil Nil x -> 1
        Node Nil right x -> 
            let rightChilds = getNodes right
            in rightChilds
        Node left Nil x -> 
            let leftChilds = getNodes left
            in leftChilds

        Node left right x -> 
            let leftChilds = getNodes left
                rightChilds = getNodes right
                answer = leftChilds+rightChilds
            in answer 

getNodeLevel :: Tree Int -> [Int]
getNodeLevel = \tree ->
    case tree of 
        Node Nil right x -> [(getNodes tree)] ++ [0] ++ (getNodeLevel right)
        Node left Nil x -> [(getNodes tree)] ++ (getNodeLevel left) ++ [0]
        Node left right x -> [(getNodes tree)] ++ (getNodeLevel left) ++ (getNodeLevel right)
        _ -> []

getNumHelper :: Tree Int -> [Int]
getNumHelper = \tree ->
    case tree of
        Node Nil Nil x -> [1]
        Node left right x -> 
            let leftChilds = getNumHelper left
                rightChilds = getNumHelper right
                answer = [((sumList leftChilds) + (sumList rightChilds))] ++ (getNumHelper left) ++(getNumHelper right)
            in answer
        _ -> [0]

getNumNodes :: Tree Int -> [Int]
getNumNodes = \tree -> getNodeLevel tree



-- Question 8: (7 Marks)
--  Given a binary tree and an integer n, write a function that truncates the tree by removing the nodes that lie on a complete path which has a sum lesser than the integer n. Please Note:
-- 1) A path will always be from the root node to the leaf.
-- 2) Some nodes may be a part of multiple paths, and in that case they must NOT be removed if they belong to at least 1 path which has a sum greater than the integer n

-- Example: 
-- Input Tree: 
-- 6
-- +---3
-- +---8
-- |   +---4
-- |   |   +---1
-- |   |   +---7
-- |   +---2
-- |   |   +---3

-- N = 20

-- Output Tree:
-- 6
-- +---8        
-- |   +---4    
-- |   |   +---7

-- truncateTree :: Tree Int -> Int -> Tree Int 


truncateHelper::  Tree Int -> [[Int]]
truncateHelper = \tree ->
    case tree of 
    _ -> 
        let allpaths = allPaths tree
        in allpaths

filterPaths :: Int -> [[Int]] -> [[Int]]
filterPaths = \num -> \lists ->
    case list of 
        x:xs | (sumList x) < num -> filterPaths xs
        _ -> x: filterPaths xs 

-- Question 9: Longest Common Subsequence. (7 Marks)
-- Given two strings, a and b, return the length of their longest common subsequence. If there is no common subsequence, return 0.
-- A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings. For example, "ace" is a subsequence of "abcde".

-- Example 1: 
-- String a: "BCDAACD"
-- String b: "ACDBAC"
-- Ouput   : 4 since the longest common subsequence is "CDAC"

-- Example 2: 
-- String a: "ACADB"
-- String b: "CBDA"
-- Output   : 2 since the longest common subsequence is "CA" (There are multiple common subsequences of length 2!)


longestCommonSubsequence :: String -> String -> Int
longestCommonSubsequence = undefined -- TO DO






