parser grammar terraformParser;

options { tokenVocab=terraformLexer; }

file
  : (providerDirective|terraformDirective|resourceDirective|variableDirective|outputDirective|moduleDirective|dataDirective)+ EOF
  ;

dataDirective
  : DATA providerType name AO (object)+ AF
  ;

moduleDirective
  : MODULE name AO (moduleSource|object)+ AF
  ;

moduleSource
  : SOURCE EQUAL STRING
  ;

providerDirective
  : PROVIDER name AO object AF
  ;

terraformDirective
  : TERRAFORM AO (object)+ AF
  ;

resourceDirective
  : RESOURCE providerType name AO object AF
  ;

variableDirective
  : VARIABLE name AO (object)+ AF
  ;

outputDirective
  : OUTPUT name AO (object)+ AF
  ;

name
  : STRING
  ;

providerType
  : STRING
  ;

type
  : TYPE
  | LIST
  | LIST PO type PF
  | MAP PO type PF
  | OBJECT PO object PF
  ;

object
  : (complexField|field)+ 
  ;

field
  : (IDENTIFIER|SOURCE) EQUAL expression
  ;

complexField
  : IDENTIFIER AO object AF
  | IDENTIFIER EQUAL AO (STRING EQUAL STRING)+ AF
  ;

validation
  : AO CONDITION EQUAL condition+
        ERROR EQUAL STRING AF
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
  : IDENTIFIER PO expression ( VIRG expression )* VIRG? PF
  ;

complexExpression
  : IDENTIFIER
  | (IDENTIFIER|TIRET)+
  | complexExpression POINT complexExpression // attribute access
  | complexExpression CO index CF // indexed array access
  | complexExpression POINT index // indexed attribute access
  | '<<EOF' (IDENTIFIERS|AUTRE|WSS+)+ 'EOF'
  | STRING complexExpression STRING
  | functionCall
  ;

array
  : CO CF
  | CO expression ( VIRG expression )* VIRG? CF
  ;

index
  : NUMBER
  | MULT
  ;