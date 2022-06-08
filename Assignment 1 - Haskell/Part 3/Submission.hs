-- Reading the file
import System.IO
import Data.Char
import Control.Monad

main :: IO ()
main = do
    putStrLn "Enter filename: "
    filename <- getLine

    fileContent <- readFile filename
    let cleanlist = cleanList (scan "" fileContent)
        cleanlist2 = cleanList cleanlist

    writeFile "23100174.txt" (generateOutput cleanlist2)

generateOutput :: [String] -> String
generateOutput = \str ->
    case str of
        [] -> ""
        x:xs | x == "\n" -> (produceToken x) ++ generateOutput xs
        x:xs -> (produceToken x) ++ " " ++ generateOutput xs

scan :: String -> String -> [String]
scan = \before -> \after ->
    case after of
        "" -> []
        x:"" -> [x]:[]

        x:y:xs | (x == '/' && y == '/') ->
            let (comment, remaining) = extractComment "" xs
            in before:([x] ++ [y] ++ comment):scan "" remaining

        x:y:xs | (x == '/' && y == '*') ->
            let (comment, remaining) = extractMultiComment "" xs
            in before:([x] ++ [y] ++ comment):scan "" remaining

        x:xs | (checkOperator [x]) == True ->
            case xs of
                y:ys | (checkSecondOperator [y]) == True ->  before:([x]++[y]):scan "" ys
                _ -> before:[x]:scan "" xs

        x:xs | (checkDelimitor [x]) == True -> before:[x]:scan "" xs
        x:xs | x  == '\n' -> before:[x]:scan "" xs
        x:xs | x /= ' ' -> scan (before ++ [x]) xs
        x:xs | x == ' ' -> before:[x]:scan "" xs

extractComment :: String -> String -> (String, String)
extractComment = \before -> \after ->
    case after of
        x:xs | x == '\n' -> (before, after)
        -- x:y:xs | x == '*' && y == '/' -> (before++[x]++[y], xs)
        x:xs -> extractComment (before ++ [x]) (xs)

extractMultiComment :: String -> String -> (String, String)
extractMultiComment = \before -> \after ->
    case after of
        x:y:xs | x == '*' && y == '/' -> (before++[x]++[y], xs)
        x:xs -> extractMultiComment (before ++ [x]) (xs)

checkOperator :: String -> Bool
checkOperator = \str ->
    case str of
        x | x == "+" || x == "!=" || x == "&&" || x == "||" || x == "-" || x == "*" || x == "/" || x == "%" || x == "<" || x == "<=" || x == ">" || x == ">=" || x=="=" || x == "==" || x == "!" || x == "&" || x == "[" || x == "]" || x == "(" || x == ")"  || x =="--" || x == "{" || x == "}" || x == "++" || x == "<<" || x == ">>" || x == "|" -> True
        _ -> False

checkSecondOperator :: String -> Bool
checkSecondOperator = \str ->
    case str of
        x | x == "=" || x == "&" || x == "|" || x == "-"  || x == "<" || x == ">"  || x == "+"  -> True
        _ -> False

checkDelimitor :: String -> Bool
checkDelimitor = \str ->
    case str of
        x | x == "," || x == ";" || x == ":" -> True
        _ -> False

checkKeyword :: String -> Bool
checkKeyword = \str ->
    case str of
        x | x == "string" || x == "int" || x == "bool" || x == "float" || x == "double" || x == "void" || x == "while" || x == "for" || x == "if" || x == "else" || x == "char" || x == "array" || x == "struct" || x == "class" || x == "break" || x == "case" || x == "return" || x == "cout" || x == "cin" || x == "true" || x == "false" || x == "endl" -> True
        _ -> False

cleanList :: [String] -> [String]
cleanList = \list ->
    case list of
        --x:xs | (checkTabs x) == True -> (removeTabs x):(cleanList xs)
        x:xs | x /= "" && x /= " "  -> x:(cleanList xs)
        x:xs | x == "" || x == " "  -> cleanList xs
        _ -> []

checkTabs :: String -> Bool
checkTabs = \str ->
    case str of
        x:xs | x == '\t' -> True
        _ -> False

removeTabs :: String -> String
removeTabs = \str ->
    case str of
        x:xs | x == '\t' -> removeTabs xs
        x:xs -> x:removeTabs xs
        "" -> ""

produceToken :: String -> String
produceToken = \str ->
    case str of
        x:y:xs | x == '/' && y == '/' -> "<comment," ++ str ++ ">"
        x:y:xs | x == '/' && y == '*' -> "<multiline-comment," ++ str ++ ">"
        x:xs | x == '\t' -> produceToken (removeTabs str)
        x | x == "\n" -> x
        x | (checkOperator x) == True -> "<operator," ++ x ++ ">"
        x | (checkDelimitor x) == True -> "<delimiter," ++ x ++ ">"
        x | (checkKeyword x) == True -> "<keyword," ++ x ++ ">"
        x:xs | x == '\"' -> "<stringConstant," ++ str ++ ">"
        x | (checkFloat x) == True && (checkNum x) == True ->  "<floatConstant," ++ str ++ ">"
        x | (checkNum x) == True && (checkFloat x) == False -> "<IntConstant," ++ str ++ ">"
        x:xs | (isDigit x) == False && (length str) > 1 && (checkUpper str) == True -> "<identifier," ++ str ++ ">"
        x -> "<error," ++ str ++ ">"

checkUpper :: String -> Bool
checkUpper = \str ->
    case str of
        "" -> False
        x:xs | (isUpper x) == True -> True
        x:xs  | (isUpper x) == False -> checkUpper xs

checkFloat :: String -> Bool
checkFloat = \str ->
    case str of
        "" -> False
        x:xs | x == '.'  -> True
        x:xs | x /= '.' -> checkFloat xs

checkNum :: String -> Bool
checkNum = \str ->
    case str of
        "" -> True
        x:xs | x == '0' || x == '1' || x == '2' || x == '3' || x == '3' || x == '4' || x == '5' || x == '6' || x == '.' -> checkNum xs
        x:xs | x /= '0' && x /= '1' && x /= '2' && x /= '3' && x /= '3' && x /= '4' && x /= '5' && x /= '6' && x /= '.' -> False

writeToFile :: IO ()
writeToFile = do
    writeFile "23100174.txt" "<stringConstant,\"hello world\">"
    --appendFile "23100174.txt" "world"
