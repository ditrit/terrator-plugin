parser grammar terraformParser;

options { tokenVocab=terraformLexer; }

file
  : directive+
  ;

directive
  : providerDirective
  | terraformDirective
  | resourceDirective
  | variableDirective
  | outputDirective
  | moduleDirective
  | dataDirective
  ;

dataDirective
  : 'data' providerType name '{' (object)+ '}'
  ;

moduleDirective
  : 'module' name '{' (moduleSource|object)+ '}'
  ;

moduleSource
  : 'source' '=' STRING
  ;

providerDirective
  : 'provider' name '{' object '}'
  ;

terraformDirective
  : 'terraform' '{' (object)+ '}'
  ;

resourceDirective
  : 'resource' providerType name '{' object '}'
  ;

variableDirective
  : 'variable' name '{' (object)+ '}'
  ;

outputDirective
  : 'output' name '{' (object)+ '}'
  ;

name
  : STRING
  ;

providerType
  : STRING
  ;

type
  : TYPE
  | 'list'
  | 'list' '(' type ')'
  | 'map' '(' type ')'
  | 'object' '(' object ')'
  ;

object
  : (complexField|field)+ 
  ;

field
  : (IDENTIFIER|SOURCE) '=' expression
  ;

complexField
  : IDENTIFIER '{' object '}'
  | IDENTIFIER '=' '{' (STRING '=' STRING)+ '}'
  ;

validation
  : '{' 'condition' '=' condition+
        'error_message' '=' STRING '}'
  ;

condition
  : STRING
  | NUMBER
  | BOOLEAN
  | BOOLEANOP
  | functionCall
  ;

expression
  : NUMBER
  | BOOLEAN
  | array
  | complexExpression
  | STRING
  | type
  ;

functionCall
  : IDENTIFIER '(' expression ( ',' expression )* ','? ')'
  ;

complexExpression
  : IDENTIFIER
  | (IDENTIFIER|'-')+
  | complexExpression '.' complexExpression // attribute access
  | complexExpression '[' index ']' // indexed array access
  | complexExpression '.' index // indexed attribute access
  | '<<EOF' (IDENTIFIERS|AUTRE|WSS+)+ 'EOF'
  | STRING complexExpression STRING
  | functionCall
  ;

array
  : '[' ']'
  | '[' expression ( ',' expression )* ','? ']'
  ;

index
  : NUMBER
  | '*'
  ;