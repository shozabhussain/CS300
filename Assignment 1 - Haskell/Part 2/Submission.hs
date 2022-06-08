-----------------------------------------------------------------------------
-- CS 300 Spring 2022 Assignment 1 Part 2
-- Deadline: Monday 14th February 2022
--
-- Please press alt Z to enable Word Wrap
--
-- Guidelines:
-- Feel free to make any helper functions where ever you need them
-- Do not show your code or make it accessible to anyone other than the course staff
-- The arguments and return types of the functions should not be changed
-- You cannot use built-in functions
-- For queries related to the trees part of the assignment, please contact Ahmed, Sameer or Dawar.
-- For queries relared to the Matrix part of the assignment, please contact Huzaifa.
-----------------------------------------------------------------------------


-----------------------------------------------------------------------------
-- Trees
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



-- -- Question 1 : Represent value of Pi upto 5 dp with a binary tree and store it in the variable 'btPi'. Pi=3.14159

-- Hint:
-- Printing the tree:
-- Node (Node (Node (Node Nil (Node Nil Nil 9) 3) (Node Nil Nil 4) 6) Nil 8) (Node Nil Nil 2) 1
-- will output:
-- 1
-- +---8
-- |   +---6
-- |   |   +---3
-- |   |   |   +---9
-- |   |   +---4
-- +---2

btPi = Node (Node Nil Nil 1 ) (Node (Node Nil Nil 1) (Node Nil (Node Nil Nil 9) 5) 4) 3

-- main = print(btPi)

-- -- Part b : Represent value of Euler's number (e) upto 5 dp with a binary tree and store it in the variable 'btE'.
-- e = 2.71828

btE = Node (Node Nil Nil 7 ) (Node (Node Nil Nil 8) (Node Nil (Node Nil Nil 8) 2) 1) 2

-- main = print(btE)




-- -- Question 2 : Traverse your binary tree of Pi and euler's number using Preorder, Inorder or Postorder traversal (ONLY 1 traversal) and store it in a list. Please state the traversal you will be using:
-- Traversal used: <Preorder>

btTraversal :: Tree a -> [a]
btTraversal = \tree ->
    case tree of
        Nil -> []
        Node (left) (right) x -> [x] ++ (btTraversal left) ++ (btTraversal right)

-- main = print(btTraversal btPi)
-- Expected output: [3,1,4,1,5,9]
-- main = print(btTraversal btE)
-- Expected output: [2,7,1,8,2,8]




-- -- Question 3:
-- For this question, you are given with 2 arguments, a binary tree and an integer n. Write a program that returns the list of paths that sum to the integer n. Please note that a path has to be from the root of the tree to a leaf node.
-- Example:

-- Value of n = 15

-- Tree:
-- 6
-- +---4
-- |   +---2
-- |   |   +---1
-- |   |   +---3
-- |   +---5
-- +---8
-- |   +---7
-- |   +---16

-- output: [[6,4,2,3],[6,4,5]]

checkTree :: Tree Int
checkTree = Node (Node (Node (Node Nil Nil 1) (Node Nil Nil 3) 2) (Node Nil Nil 5) 4) (Node (Node Nil Nil 7) (Node Nil Nil 16) 8) 6

countPaths :: Tree Int -> Int -> [[Int]]
countPaths = \tree -> \num ->
    case tree of
        Node (left) (right) x -> filterPaths (allPaths tree) num

allPaths :: Tree Int ->  [[Int]]
allPaths = \tree ->
    case tree of
        Node Nil Nil x -> [[x]]
        Node (left) (right) x ->
            let pathsLeft = allPaths left
                pathsRight = allPaths right
                paths = pathsLeft ++ pathsRight
            in insertHelper paths x
        _ -> [[]]

insertHelper :: [[Int]] -> Int -> [[Int]]
insertHelper = \lists -> \num ->
    case lists of
        x:xs -> (num:x) : insertHelper xs num
        _ -> []

sumList :: [Int] -> Int
sumList = \list ->
    case list of
        x:xs -> x + sumList xs
        _ -> 0

filterPaths :: [[Int]] -> Int -> [[Int]]
filterPaths = \list -> \num ->
    case list of
        x:xs | (sumList x) == num -> x:(filterPaths (xs) num)
        x:xs | (sumList x) /= num -> (filterPaths (xs) num)
        _ -> []

-- -- Question 4:
-- For this question, you are given with 2 arguments, a binary tree and an integer n. Each node of the tree is a tuple which has a unique key (which will be an integer) and a switch which can be true and false. You will pass the ball from the root of the tree until it reaches a point from which it can't go forward. At a node, if its switch is off (false) then the ball will go to its left, otherwise to the right. If there is no path forward then the ball stops and the next iteration starts. After the ball is passed, the switch changes.. for example if a switch is off and it passes the ball to its left or right, then it will turn on . You will repeat this process n times and will return the node which contains the ball at the nth iteration. Find a simple visualization here: https://drive.google.com/file/d/1aGlUdtHhpKkX0nuTxfU2_5-_yF9Cj8TP/view?usp=sharing
-- Example:

-- value of integer n = 2

-- Tree:
-- (6,True)
-- +---(5,False)
-- |   +---(1,True)
-- |   +---(3,False)
-- +---(2,False)

-- Output: 1

q4tree :: Tree (Int, Bool)
q4tree = Node (Node (Node Nil Nil (1, True)) (Node Nil Nil (3, False)) (5, False)) (Node Nil Nil (2, False)) (6,True)

droppingBall :: Tree (Int, Bool) -> Int -> Int
droppingBall = \tree -> \n -> droppingHelper tree tree n

droppingHelper ::Tree (Int, Bool) -> Tree (Int, Bool) -> Int -> Int
droppingHelper = \tree -> \mainTree -> \n ->
    case tree of
        Node Nil Nil (key, switch) | n == 1 -> key
        Node Nil Nil (key, switch) | n /= 0 -> droppingHelper (switchSigns mainTree) (switchSigns mainTree) (n-1)
        Node left right (key, switch) | switch == False -> droppingHelper left mainTree n
        Node left right (key, switch) | switch == True -> droppingHelper right mainTree n

switchSigns :: Tree (Int, Bool) -> Tree (Int, Bool)
switchSigns = \tree ->
    case tree of
        Node Nil Nil (key, switch) | switch == True -> Node Nil Nil (key, False)
        Node Nil Nil (key, switch) | switch == False -> Node Nil Nil (key, True)
        Node left right (key, switch) | switch == False -> Node (switchSigns left) right (key, True)
        Node left right (key, switch) | switch == True -> Node left (switchSigns right) (key, False)

-- -- Question 5:
-- For this Question, you will be given with a postfix expression in the form of a string. You have to construct an expression tree from this string. After constructing the expression tree you will have to use it to convert it into infix.
-- Example:
-- Postfix: a b + c d e + * *
-- infix: (a+b)*(c*(d+e))

-- Expression Tree:

-- '*'
-- +---'+'
-- |   +---'a'
-- |   +---'b'
-- +---'*'
-- |   +---'C'
-- |   +---'+'
-- |   |   +---'d'
-- |   |   +---'e'

push :: [a] -> a -> [a]
push = \list -> \item -> item:list

pop :: [a] -> (a, [a])
pop = \list ->
    case list of
        x:[] -> (x, [])
        x:xs -> (x, xs)

construct :: String -> [ Tree String] -> Tree String
construct = \exp -> \stack ->
    case exp of
        x:xs | x /= '*' && x /= '+' && x /= '/' && x /= '-' ->
            let newStack = push (stack) (Node Nil Nil [x] )
            in construct xs newStack

        x:xs | x == '*' || x == '+' || x == '/' || x == '-' ->
            let (right, stack1) = pop stack
                (left , stack2) = pop stack1
                newStack = push (stack2) (Node left right [x] )
            in construct xs newStack

        _ ->
            let (finalTree, finalStack) = pop stack
            in finalTree

constructExpressionTree :: String -> Tree String
constructExpressionTree = \exp ->
    case exp of
        "" -> Nil
        _ -> construct exp []


convertToInfix :: Tree String -> String
convertToInfix = \tree ->
    case tree of
        Nil -> ""
        Node Nil Nil x -> x
        Node left right x -> "(" ++ convertToInfix left ++ x ++ convertToInfix right ++ ")"


-- BONUS Question: No extra marks but the first 5 people to solve this get a treat from Ahmed and Sameer.
-- -- Question x:
-- For this question, you are given with a binary tree which may or may not be balanced. Write a program that balances the tree and returns it.
-- balanceTree:: Tree Int -> Tree Int
-- balanceTree = undefined -- TO DO




-----------------------------------------------------------------------------
-- Matrices
-----------------------------------------------------------------------------

-- -- Question 6:
-- For this task, you need to develop a function that performs any given operation element-wise on two given matrices. This operation could be addition, subtraction, element-wise product or any operation that has been given to the function as an argument. You cannot use any built-in functions such as map, zip, or zipWith etc. This task would be easier for you if you first make a function that performs any given operation, element-wise, on two lists e.g.
-- thisFunction :: (a -> b -> c) -> [a] -> [b] -> [c]
-- thisFunction (+) [1, 2, 3] [4, 5, 6] returns [5,7,9].
-- However, there is no compulsion to make such a helper function but the same function might be helpful to use in the next part (nxn matrix multiplication) as well.

foldHelper :: (a -> b -> c) -> [a] -> [b] -> [c]
foldHelper = \fn -> \list1 -> \list2 ->
    case list1 of
        [] -> []
        x:xs ->
            case list2 of
                [] -> []
                y:ys -> (fn x y):foldHelper fn xs ys

matrixElemOp :: Num a => [[a]] -> [[a]] -> (a -> a -> a) -> [[a]]
matrixElemOp = \matrix1 -> \matrix2 -> \fn ->
    case matrix1 of
        [[]] -> []
        x:xs ->
            case matrix2 of
                [[]] -> [[]]
                y:ys -> (foldHelper fn x y) : matrixElemOp xs ys fn
        _ -> []



-- -- Question 7:
-- In this part, you are going to make a functional matrix product function which can multiply two matrices. These matrices can be of any dimensions, so long as the number of columns of the first matrix is equal to the number of rows of the second matrix (you may assume that user would not enter incompatible matrices). You do not have to worry about the efficiency of your function. The following link might be useful: https://en.wikipedia.org/wiki/Matrix_multiplication#Definition.

matrixMult :: Num a => [[a]] -> [[a]] -> [[a]]
matrixMult = \matrix1 -> \matrix2 ->
    case matrix1 of
        [[]] -> []
        row:xs ->
            let modifiedMat = multiplyHelper row matrix2
                sumed = sumLists modifiedMat
            in sumed:matrixMult xs matrix2
        _ -> []

sumLists :: Num a => [[a]] -> [a]
sumLists = \lists ->
    case lists of
        [[]] -> []
        x:y:[] -> foldHelper (+) (x) (y)
        x:y:xs ->
            let foldHelperAns = (foldHelper (+) (x) (y))
            in sumLists (foldHelperAns:xs)
        x:[] -> x

multiplyHelper :: Num a => [a] -> [[a]] -> [[a]]
multiplyHelper = \list -> \mat ->
    case list of
        [] -> []
        x:xs ->
            case mat of
                -- y:ys | ys == [[]] -> (multiplySingleWithList x y)
                y:ys -> (multiplySingleWithList x y) : multiplyHelper xs ys

multiplySingleWithList :: Num a => a -> [a] -> [a]
multiplySingleWithList = \num -> \list ->
    case list of
        [] -> []
        x:xs -> x*num: multiplySingleWithList num xs

-----------------------------------------------------------------------------
-- The End :}
-----------------------------------------------------------------------------




