// Generated from .\terraformParser.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import TerraformListener from '../parser/TerraformListener.js';

const serializedATN = ['\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786',
  '\u5964\u0003*\u0120\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004',
  '\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007',
  '\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f',
  '\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010',
  '\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014',
  '\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017',
  '\u0004\u0018\t\u0018\u0003\u0002\u0006\u00022\n\u0002\r\u0002\u000e',
  '\u00023\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003',
  '\u0003\u0003\u0003\u0003\u0005\u0003=\n\u0003\u0003\u0004\u0003\u0004',
  '\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u0004D\n\u0004\r\u0004\u000e',
  '\u0004E\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005',
  '\u0003\u0005\u0003\u0005\u0006\u0005O\n\u0005\r\u0005\u000e\u0005P\u0003',
  '\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003',
  '\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003',
  '\b\u0003\b\u0003\b\u0006\bb\n\b\r\b\u000e\bc\u0003\b\u0003\b\u0003\t',
  '\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003',
  '\n\u0003\n\u0006\ns\n\n\r\n\u000e\nt\u0003\n\u0003\n\u0003\u000b\u0003',
  '\u000b\u0003\u000b\u0003\u000b\u0006\u000b}\n\u000b\r\u000b\u000e\u000b',
  '~\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e',
  '\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e',
  '\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e',
  '\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0098\n',
  '\u000e\u0003\u000f\u0003\u000f\u0006\u000f\u009c\n\u000f\r\u000f\u000e',
  '\u000f\u009d\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011',
  '\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011',
  '\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0006\u0011\u00af\n',
  '\u0011\r\u0011\u000e\u0011\u00b0\u0003\u0011\u0005\u0011\u00b4\n\u0011',
  '\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0006\u0012\u00ba\n',
  '\u0012\r\u0012\u000e\u0012\u00bb\u0003\u0012\u0003\u0012\u0003\u0012',
  '\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013',
  '\u0003\u0013\u0005\u0013\u00c8\n\u0013\u0003\u0014\u0003\u0014\u0003',
  '\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u00d0\n\u0014',
  '\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0007\u0015',
  '\u00d7\n\u0015\f\u0015\u000e\u0015\u00da\u000b\u0015\u0003\u0015\u0005',
  '\u0015\u00dd\n\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016',
  '\u0003\u0016\u0006\u0016\u00e4\n\u0016\r\u0016\u000e\u0016\u00e5\u0003',
  '\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0006\u0016\u00ec\n\u0016',
  '\r\u0016\u000e\u0016\u00ed\u0006\u0016\u00f0\n\u0016\r\u0016\u000e\u0016',
  '\u00f1\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003',
  '\u0016\u0005\u0016\u00fa\n\u0016\u0003\u0016\u0003\u0016\u0003\u0016',
  '\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016',
  '\u0003\u0016\u0003\u0016\u0007\u0016\u0107\n\u0016\f\u0016\u000e\u0016',
  '\u010a\u000b\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003',
  '\u0017\u0003\u0017\u0007\u0017\u0112\n\u0017\f\u0017\u000e\u0017\u0115',
  '\u000b\u0017\u0003\u0017\u0005\u0017\u0118\n\u0017\u0003\u0017\u0003',
  '\u0017\u0005\u0017\u011c\n\u0017\u0003\u0018\u0003\u0018\u0003\u0018',
  '\u0002\u0003*\u0019\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014',
  '\u0016\u0018\u001a\u001c\u001e "$&(*,.\u0002\u0005\u0004\u0002\u0005',
  '\u0005\u001e\u001e\u0004\u0002\u0019\u0019\u001e\u001e\u0004\u0002\u001a',
  '\u001a  \u0002\u0138\u00021\u0003\u0002\u0002\u0002\u0004<\u0003\u0002',
  '\u0002\u0002\u0006>\u0003\u0002\u0002\u0002\bI\u0003\u0002\u0002\u0002',
  '\nT\u0003\u0002\u0002\u0002\fX\u0003\u0002\u0002\u0002\u000e^\u0003',
  '\u0002\u0002\u0002\u0010g\u0003\u0002\u0002\u0002\u0012n\u0003\u0002',
  '\u0002\u0002\u0014x\u0003\u0002\u0002\u0002\u0016\u0082\u0003\u0002',
  '\u0002\u0002\u0018\u0084\u0003\u0002\u0002\u0002\u001a\u0097\u0003\u0002',
  '\u0002\u0002\u001c\u009b\u0003\u0002\u0002\u0002\u001e\u009f\u0003\u0002',
  '\u0002\u0002 \u00b3\u0003\u0002\u0002\u0002"\u00b5\u0003\u0002\u0002',
  '\u0002$\u00c7\u0003\u0002\u0002\u0002&\u00cf\u0003\u0002\u0002\u0002',
  '(\u00d1\u0003\u0002\u0002\u0002*\u00f9\u0003\u0002\u0002\u0002,\u011b',
  '\u0003\u0002\u0002\u0002.\u011d\u0003\u0002\u0002\u000202\u0005\u0004',
  '\u0003\u000210\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u000231\u0003',
  '\u0002\u0002\u000234\u0003\u0002\u0002\u00024\u0003\u0003\u0002\u0002',
  '\u00025=\u0005\f\u0007\u00026=\u0005\u000e\b\u00027=\u0005\u0010\t\u0002',
  '8=\u0005\u0012\n\u00029=\u0005\u0014\u000b\u0002:=\u0005\b\u0005\u0002',
  ';=\u0005\u0006\u0004\u0002<5\u0003\u0002\u0002\u0002<6\u0003\u0002\u0002',
  '\u0002<7\u0003\u0002\u0002\u0002<8\u0003\u0002\u0002\u0002<9\u0003\u0002',
  '\u0002\u0002<:\u0003\u0002\u0002\u0002<;\u0003\u0002\u0002\u0002=\u0005',
  '\u0003\u0002\u0002\u0002>?\u0007\u0004\u0002\u0002?@\u0005\u0018\r\u0002',
  '@A\u0005\u0016\f\u0002AC\u0007\u0010\u0002\u0002BD\u0005\u001c\u000f',
  '\u0002CB\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002\u0002EC\u0003\u0002',
  '\u0002\u0002EF\u0003\u0002\u0002\u0002FG\u0003\u0002\u0002\u0002GH\u0007',
  '\u0011\u0002\u0002H\u0007\u0003\u0002\u0002\u0002IJ\u0007\u0003\u0002',
  '\u0002JK\u0005\u0016\f\u0002KN\u0007\u0010\u0002\u0002LO\u0005\n\u0006',
  '\u0002MO\u0005\u001c\u000f\u0002NL\u0003\u0002\u0002\u0002NM\u0003\u0002',
  '\u0002\u0002OP\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002PQ\u0003',
  '\u0002\u0002\u0002QR\u0003\u0002\u0002\u0002RS\u0007\u0011\u0002\u0002',
  'S\t\u0003\u0002\u0002\u0002TU\u0007\u0005\u0002\u0002UV\u0007\u0012',
  '\u0002\u0002VW\u0007\u001f\u0002\u0002W\u000b\u0003\u0002\u0002\u0002',
  'XY\u0007\u0006\u0002\u0002YZ\u0005\u0016\f\u0002Z[\u0007\u0010\u0002',
  '\u0002[\\\u0005\u001c\u000f\u0002\\]\u0007\u0011\u0002\u0002]\r\u0003',
  '\u0002\u0002\u0002^_\u0007\u0007\u0002\u0002_a\u0007\u0010\u0002\u0002',
  '`b\u0005\u001c\u000f\u0002a`\u0003\u0002\u0002\u0002bc\u0003\u0002\u0002',
  '\u0002ca\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002de\u0003\u0002',
  '\u0002\u0002ef\u0007\u0011\u0002\u0002f\u000f\u0003\u0002\u0002\u0002',
  'gh\u0007\b\u0002\u0002hi\u0005\u0018\r\u0002ij\u0005\u0016\f\u0002j',
  'k\u0007\u0010\u0002\u0002kl\u0005\u001c\u000f\u0002lm\u0007\u0011\u0002',
  '\u0002m\u0011\u0003\u0002\u0002\u0002no\u0007\t\u0002\u0002op\u0005',
  '\u0016\f\u0002pr\u0007\u0010\u0002\u0002qs\u0005\u001c\u000f\u0002r',
  'q\u0003\u0002\u0002\u0002st\u0003\u0002\u0002\u0002tr\u0003\u0002\u0002',
  '\u0002tu\u0003\u0002\u0002\u0002uv\u0003\u0002\u0002\u0002vw\u0007\u0011',
  '\u0002\u0002w\u0013\u0003\u0002\u0002\u0002xy\u0007\n\u0002\u0002yz',
  '\u0005\u0016\f\u0002z|\u0007\u0010\u0002\u0002{}\u0005\u001c\u000f\u0002',
  '|{\u0003\u0002\u0002\u0002}~\u0003\u0002\u0002\u0002~|\u0003\u0002\u0002',
  '\u0002~\u007f\u0003\u0002\u0002\u0002\u007f\u0080\u0003\u0002\u0002',
  '\u0002\u0080\u0081\u0007\u0011\u0002\u0002\u0081\u0015\u0003\u0002\u0002',
  '\u0002\u0082\u0083\u0007\u001f\u0002\u0002\u0083\u0017\u0003\u0002\u0002',
  '\u0002\u0084\u0085\u0007\u001f\u0002\u0002\u0085\u0019\u0003\u0002\u0002',
  '\u0002\u0086\u0098\u0007\u001d\u0002\u0002\u0087\u0098\u0007\u000b\u0002',
  '\u0002\u0088\u0089\u0007\u000b\u0002\u0002\u0089\u008a\u0007\u0013\u0002',
  '\u0002\u008a\u008b\u0005\u001a\u000e\u0002\u008b\u008c\u0007\u0014\u0002',
  '\u0002\u008c\u0098\u0003\u0002\u0002\u0002\u008d\u008e\u0007\f\u0002',
  '\u0002\u008e\u008f\u0007\u0013\u0002\u0002\u008f\u0090\u0005\u001a\u000e',
  '\u0002\u0090\u0091\u0007\u0014\u0002\u0002\u0091\u0098\u0003\u0002\u0002',
  '\u0002\u0092\u0093\u0007\r\u0002\u0002\u0093\u0094\u0007\u0013\u0002',
  '\u0002\u0094\u0095\u0005\u001c\u000f\u0002\u0095\u0096\u0007\u0014\u0002',
  '\u0002\u0096\u0098\u0003\u0002\u0002\u0002\u0097\u0086\u0003\u0002\u0002',
  '\u0002\u0097\u0087\u0003\u0002\u0002\u0002\u0097\u0088\u0003\u0002\u0002',
  '\u0002\u0097\u008d\u0003\u0002\u0002\u0002\u0097\u0092\u0003\u0002\u0002',
  '\u0002\u0098\u001b\u0003\u0002\u0002\u0002\u0099\u009c\u0005 \u0011',
  '\u0002\u009a\u009c\u0005\u001e\u0010\u0002\u009b\u0099\u0003\u0002\u0002',
  '\u0002\u009b\u009a\u0003\u0002\u0002\u0002\u009c\u009d\u0003\u0002\u0002',
  '\u0002\u009d\u009b\u0003\u0002\u0002\u0002\u009d\u009e\u0003\u0002\u0002',
  '\u0002\u009e\u001d\u0003\u0002\u0002\u0002\u009f\u00a0\t\u0002\u0002',
  '\u0002\u00a0\u00a1\u0007\u0012\u0002\u0002\u00a1\u00a2\u0005&\u0014',
  '\u0002\u00a2\u001f\u0003\u0002\u0002\u0002\u00a3\u00a4\u0007\u001e\u0002',
  '\u0002\u00a4\u00a5\u0007\u0010\u0002\u0002\u00a5\u00a6\u0005\u001c\u000f',
  '\u0002\u00a6\u00a7\u0007\u0011\u0002\u0002\u00a7\u00b4\u0003\u0002\u0002',
  '\u0002\u00a8\u00a9\u0007\u001e\u0002\u0002\u00a9\u00aa\u0007\u0012\u0002',
  '\u0002\u00aa\u00ae\u0007\u0010\u0002\u0002\u00ab\u00ac\u0007\u001f\u0002',
  '\u0002\u00ac\u00ad\u0007\u0012\u0002\u0002\u00ad\u00af\u0007\u001f\u0002',
  '\u0002\u00ae\u00ab\u0003\u0002\u0002\u0002\u00af\u00b0\u0003\u0002\u0002',
  '\u0002\u00b0\u00ae\u0003\u0002\u0002\u0002\u00b0\u00b1\u0003\u0002\u0002',
  '\u0002\u00b1\u00b2\u0003\u0002\u0002\u0002\u00b2\u00b4\u0007\u0011\u0002',
  '\u0002\u00b3\u00a3\u0003\u0002\u0002\u0002\u00b3\u00a8\u0003\u0002\u0002',
  '\u0002\u00b4!\u0003\u0002\u0002\u0002\u00b5\u00b6\u0007\u0010\u0002',
  '\u0002\u00b6\u00b7\u0007\u000e\u0002\u0002\u00b7\u00b9\u0007\u0012\u0002',
  '\u0002\u00b8\u00ba\u0005$\u0013\u0002\u00b9\u00b8\u0003\u0002\u0002',
  '\u0002\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00b9\u0003\u0002\u0002',
  '\u0002\u00bb\u00bc\u0003\u0002\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002',
  '\u0002\u00bd\u00be\u0007\u000f\u0002\u0002\u00be\u00bf\u0007\u0012\u0002',
  '\u0002\u00bf\u00c0\u0007\u001f\u0002\u0002\u00c0\u00c1\u0007\u0011\u0002',
  '\u0002\u00c1#\u0003\u0002\u0002\u0002\u00c2\u00c8\u0007\u001f\u0002',
  '\u0002\u00c3\u00c8\u0007 \u0002\u0002\u00c4\u00c8\u0007\u001c\u0002',
  '\u0002\u00c5\u00c8\u0007\u001b\u0002\u0002\u00c6\u00c8\u0005(\u0015',
  '\u0002\u00c7\u00c2\u0003\u0002\u0002\u0002\u00c7\u00c3\u0003\u0002\u0002',
  '\u0002\u00c7\u00c4\u0003\u0002\u0002\u0002\u00c7\u00c5\u0003\u0002\u0002',
  '\u0002\u00c7\u00c6\u0003\u0002\u0002\u0002\u00c8%\u0003\u0002\u0002',
  '\u0002\u00c9\u00d0\u0007 \u0002\u0002\u00ca\u00d0\u0007\u001c\u0002',
  '\u0002\u00cb\u00d0\u0005,\u0017\u0002\u00cc\u00d0\u0005*\u0016\u0002',
  '\u00cd\u00d0\u0007\u001f\u0002\u0002\u00ce\u00d0\u0005\u001a\u000e\u0002',
  '\u00cf\u00c9\u0003\u0002\u0002\u0002\u00cf\u00ca\u0003\u0002\u0002\u0002',
  '\u00cf\u00cb\u0003\u0002\u0002\u0002\u00cf\u00cc\u0003\u0002\u0002\u0002',
  '\u00cf\u00cd\u0003\u0002\u0002\u0002\u00cf\u00ce\u0003\u0002\u0002\u0002',
  "\u00d0\'\u0003\u0002\u0002\u0002\u00d1\u00d2\u0007\u001e\u0002\u0002",
  '\u00d2\u00d3\u0007\u0013\u0002\u0002\u00d3\u00d8\u0005&\u0014\u0002',
  '\u00d4\u00d5\u0007\u0017\u0002\u0002\u00d5\u00d7\u0005&\u0014\u0002',
  '\u00d6\u00d4\u0003\u0002\u0002\u0002\u00d7\u00da\u0003\u0002\u0002\u0002',
  '\u00d8\u00d6\u0003\u0002\u0002\u0002\u00d8\u00d9\u0003\u0002\u0002\u0002',
  '\u00d9\u00dc\u0003\u0002\u0002\u0002\u00da\u00d8\u0003\u0002\u0002\u0002',
  '\u00db\u00dd\u0007\u0017\u0002\u0002\u00dc\u00db\u0003\u0002\u0002\u0002',
  '\u00dc\u00dd\u0003\u0002\u0002\u0002\u00dd\u00de\u0003\u0002\u0002\u0002',
  '\u00de\u00df\u0007\u0014\u0002\u0002\u00df)\u0003\u0002\u0002\u0002',
  '\u00e0\u00e1\b\u0016\u0001\u0002\u00e1\u00fa\u0007\u001e\u0002\u0002',
  '\u00e2\u00e4\t\u0003\u0002\u0002\u00e3\u00e2\u0003\u0002\u0002\u0002',
  '\u00e4\u00e5\u0003\u0002\u0002\u0002\u00e5\u00e3\u0003\u0002\u0002\u0002',
  '\u00e5\u00e6\u0003\u0002\u0002\u0002\u00e6\u00fa\u0003\u0002\u0002\u0002',
  '\u00e7\u00ef\u0007%\u0002\u0002\u00e8\u00f0\u0007&\u0002\u0002\u00e9',
  "\u00f0\u0007)\u0002\u0002\u00ea\u00ec\u0007\'\u0002\u0002\u00eb\u00ea",
  '\u0003\u0002\u0002\u0002\u00ec\u00ed\u0003\u0002\u0002\u0002\u00ed\u00eb',
  '\u0003\u0002\u0002\u0002\u00ed\u00ee\u0003\u0002\u0002\u0002\u00ee\u00f0',
  '\u0003\u0002\u0002\u0002\u00ef\u00e8\u0003\u0002\u0002\u0002\u00ef\u00e9',
  '\u0003\u0002\u0002\u0002\u00ef\u00eb\u0003\u0002\u0002\u0002\u00f0\u00f1',
  '\u0003\u0002\u0002\u0002\u00f1\u00ef\u0003\u0002\u0002\u0002\u00f1\u00f2',
  '\u0003\u0002\u0002\u0002\u00f2\u00f3\u0003\u0002\u0002\u0002\u00f3\u00fa',
  '\u0007*\u0002\u0002\u00f4\u00f5\u0007\u001f\u0002\u0002\u00f5\u00f6',
  '\u0005*\u0016\u0002\u00f6\u00f7\u0007\u001f\u0002\u0002\u00f7\u00fa',
  '\u0003\u0002\u0002\u0002\u00f8\u00fa\u0005(\u0015\u0002\u00f9\u00e0',
  '\u0003\u0002\u0002\u0002\u00f9\u00e3\u0003\u0002\u0002\u0002\u00f9\u00e7',
  '\u0003\u0002\u0002\u0002\u00f9\u00f4\u0003\u0002\u0002\u0002\u00f9\u00f8',
  '\u0003\u0002\u0002\u0002\u00fa\u0108\u0003\u0002\u0002\u0002\u00fb\u00fc',
  '\f\b\u0002\u0002\u00fc\u00fd\u0007\u0018\u0002\u0002\u00fd\u0107\u0005',
  '*\u0016\t\u00fe\u00ff\f\u0007\u0002\u0002\u00ff\u0100\u0007\u0015\u0002',
  '\u0002\u0100\u0101\u0005.\u0018\u0002\u0101\u0102\u0007\u0016\u0002',
  '\u0002\u0102\u0107\u0003\u0002\u0002\u0002\u0103\u0104\f\u0006\u0002',
  '\u0002\u0104\u0105\u0007\u0018\u0002\u0002\u0105\u0107\u0005.\u0018',
  '\u0002\u0106\u00fb\u0003\u0002\u0002\u0002\u0106\u00fe\u0003\u0002\u0002',
  '\u0002\u0106\u0103\u0003\u0002\u0002\u0002\u0107\u010a\u0003\u0002\u0002',
  '\u0002\u0108\u0106\u0003\u0002\u0002\u0002\u0108\u0109\u0003\u0002\u0002',
  '\u0002\u0109+\u0003\u0002\u0002\u0002\u010a\u0108\u0003\u0002\u0002',
  '\u0002\u010b\u010c\u0007\u0015\u0002\u0002\u010c\u011c\u0007\u0016\u0002',
  '\u0002\u010d\u010e\u0007\u0015\u0002\u0002\u010e\u0113\u0005&\u0014',
  '\u0002\u010f\u0110\u0007\u0017\u0002\u0002\u0110\u0112\u0005&\u0014',
  '\u0002\u0111\u010f\u0003\u0002\u0002\u0002\u0112\u0115\u0003\u0002\u0002',
  '\u0002\u0113\u0111\u0003\u0002\u0002\u0002\u0113\u0114\u0003\u0002\u0002',
  '\u0002\u0114\u0117\u0003\u0002\u0002\u0002\u0115\u0113\u0003\u0002\u0002',
  '\u0002\u0116\u0118\u0007\u0017\u0002\u0002\u0117\u0116\u0003\u0002\u0002',
  '\u0002\u0117\u0118\u0003\u0002\u0002\u0002\u0118\u0119\u0003\u0002\u0002',
  '\u0002\u0119\u011a\u0007\u0016\u0002\u0002\u011a\u011c\u0003\u0002\u0002',
  '\u0002\u011b\u010b\u0003\u0002\u0002\u0002\u011b\u010d\u0003\u0002\u0002',
  '\u0002\u011c-\u0003\u0002\u0002\u0002\u011d\u011e\t\u0004\u0002\u0002',
  '\u011e/\u0003\u0002\u0002\u0002\u001e3<ENPct~\u0097\u009b\u009d\u00b0',
  '\u00b3\u00bb\u00c7\u00cf\u00d8\u00dc\u00e5\u00ed\u00ef\u00f1\u00f9\u0106',
  '\u0108\u0113\u0117\u011b'].join('');

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4.dfa.DFA(ds, index));

const sharedContextCache = new antlr4.PredictionContextCache();

export default class terraformParser extends antlr4.Parser {
  static grammarFileName = 'terraformParser.g4';

  static literalNames = [null, "'module'", "'data'", "'source'", "'provider'",
    "'terraform'", "'resource'", "'variable'", "'output'",
    "'list'", "'map'", "'object'", "'condition'",
    "'error_message'", "'{'", "'}'", "'='", "'('",
    "')'", "'['", "']'", "','", "'.'", "'-'", "'*'",
    null, null, null, null, null, null, null, null,
    null, null, "'<<EOF'", null, null, null, null,
    "'EOF'"];

  static symbolicNames = [null, 'MODULE', 'DATA', 'SOURCE', 'PROVIDER',
    'TERRAFORM', 'RESOURCE', 'VARIABLE', 'OUTPUT',
    'LIST', 'MAP', 'OBJECT', 'CONDITION', 'ERROR',
    'AO', 'AF', 'EQUAL', 'PO', 'PF', 'CO', 'CF',
    'VIRG', 'POINT', 'TIRET', 'MULT', 'BOOLEANOP',
    'BOOLEAN', 'TYPE', 'IDENTIFIER', 'STRING',
    'NUMBER', 'COMMENT', 'LINE_COMMENT', 'HAS_COMMENT',
    'WS', 'OPEN', 'IDENTIFIERS', 'WSS', 'NUMBERS',
    'AUTRE', 'CLOSE'];

  static ruleNames = ['file', 'directive', 'dataDirective', 'moduleDirective',
    'moduleSource', 'providerDirective', 'terraformDirective',
    'resourceDirective', 'variableDirective', 'outputDirective',
    'name', 'providerType', 'type', 'object', 'field',
    'complexField', 'validation', 'condition', 'expression',
    'functionCall', 'complexExpression', 'array', 'index'];

  constructor(input) {
    super(input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = terraformParser.ruleNames;
    this.literalNames = terraformParser.literalNames;
    this.symbolicNames = terraformParser.symbolicNames;
  }

  get atn() {
    return atn;
  }

  sempred(localctx, ruleIndex, predIndex) {
    	switch (ruleIndex) {
    	case 20:
    	    		return this.complexExpression_sempred(localctx, predIndex);
      default:
        throw `No predicate with index:${ruleIndex}`;
    }
  }

  complexExpression_sempred(localctx, predIndex) {
    	switch (predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 6);
    		case 1:
    			return this.precpred(this._ctx, 5);
    		case 2:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw `No predicate with index:${predIndex}`;
    	}
  }

  file() {
	    const localctx = new FileContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, terraformParser.RULE_file);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 46;
	            this.directive();
	            this.state = 49;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << terraformParser.MODULE) | (1 << terraformParser.DATA) | (1 << terraformParser.PROVIDER) | (1 << terraformParser.TERRAFORM) | (1 << terraformParser.RESOURCE) | (1 << terraformParser.VARIABLE) | (1 << terraformParser.OUTPUT))) !== 0));
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  directive() {
	    const localctx = new DirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, terraformParser.RULE_directive);
	    try {
	        this.state = 58;
	        this._errHandler.sync(this);
	        switch (this._input.LA(1)) {
	        case terraformParser.PROVIDER:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 51;
	            this.providerDirective();
	            break;
	        case terraformParser.TERRAFORM:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 52;
	            this.terraformDirective();
	            break;
	        case terraformParser.RESOURCE:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 53;
	            this.resourceDirective();
	            break;
	        case terraformParser.VARIABLE:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 54;
	            this.variableDirective();
	            break;
	        case terraformParser.OUTPUT:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 55;
	            this.outputDirective();
	            break;
	        case terraformParser.MODULE:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 56;
	            this.moduleDirective();
	            break;
	        case terraformParser.DATA:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 57;
	            this.dataDirective();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  dataDirective() {
	    const localctx = new DataDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, terraformParser.RULE_dataDirective);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 60;
	        this.match(terraformParser.DATA);
	        this.state = 61;
	        this.providerType();
	        this.state = 62;
	        this.name();
	        this.state = 63;
	        this.match(terraformParser.AO);
	        this.state = 65;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 64;
	            this.object();
	            this.state = 67;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while (_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER);
	        this.state = 69;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  moduleDirective() {
	    const localctx = new ModuleDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, terraformParser.RULE_moduleDirective);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 71;
	        this.match(terraformParser.MODULE);
	        this.state = 72;
	        this.name();
	        this.state = 73;
	        this.match(terraformParser.AO);
	        this.state = 76;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 76;
	            this._errHandler.sync(this);
	            const la_ = this._interp.adaptivePredict(this._input, 3, this._ctx);
	            switch (la_) {
	            case 1:
	                this.state = 74;
	                this.moduleSource();
	                break;

	            case 2:
	                this.state = 75;
	                this.object();
	                break;
	            }
	            this.state = 78;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while (_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER);
	        this.state = 80;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  moduleSource() {
	    const localctx = new ModuleSourceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, terraformParser.RULE_moduleSource);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 82;
	        this.match(terraformParser.SOURCE);
	        this.state = 83;
	        this.match(terraformParser.EQUAL);
	        this.state = 84;
	        this.match(terraformParser.STRING);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  providerDirective() {
	    const localctx = new ProviderDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, terraformParser.RULE_providerDirective);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 86;
	        this.match(terraformParser.PROVIDER);
	        this.state = 87;
	        this.name();
	        this.state = 88;
	        this.match(terraformParser.AO);
	        this.state = 89;
	        this.object();
	        this.state = 90;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  terraformDirective() {
	    const localctx = new TerraformDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, terraformParser.RULE_terraformDirective);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 92;
	        this.match(terraformParser.TERRAFORM);
	        this.state = 93;
	        this.match(terraformParser.AO);
	        this.state = 95;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 94;
	            this.object();
	            this.state = 97;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while (_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER);
	        this.state = 99;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  resourceDirective() {
	    const localctx = new ResourceDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, terraformParser.RULE_resourceDirective);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 101;
	        this.match(terraformParser.RESOURCE);
	        this.state = 102;
	        this.providerType();
	        this.state = 103;
	        this.name();
	        this.state = 104;
	        this.match(terraformParser.AO);
	        this.state = 105;
	        this.object();
	        this.state = 106;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  variableDirective() {
	    const localctx = new VariableDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, terraformParser.RULE_variableDirective);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 108;
	        this.match(terraformParser.VARIABLE);
	        this.state = 109;
	        this.name();
	        this.state = 110;
	        this.match(terraformParser.AO);
	        this.state = 112;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 111;
	            this.object();
	            this.state = 114;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while (_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER);
	        this.state = 116;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  outputDirective() {
	    const localctx = new OutputDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, terraformParser.RULE_outputDirective);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 118;
	        this.match(terraformParser.OUTPUT);
	        this.state = 119;
	        this.name();
	        this.state = 120;
	        this.match(terraformParser.AO);
	        this.state = 122;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 121;
	            this.object();
	            this.state = 124;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while (_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER);
	        this.state = 126;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  name() {
	    const localctx = new NameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, terraformParser.RULE_name);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 128;
	        this.match(terraformParser.STRING);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  providerType() {
	    const localctx = new ProviderTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, terraformParser.RULE_providerType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 130;
	        this.match(terraformParser.STRING);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  type() {
	    const localctx = new TypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, terraformParser.RULE_type);
	    try {
	        this.state = 149;
	        this._errHandler.sync(this);
	        const la_ = this._interp.adaptivePredict(this._input, 8, this._ctx);
	        switch (la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 132;
	            this.match(terraformParser.TYPE);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 133;
	            this.match(terraformParser.LIST);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 134;
	            this.match(terraformParser.LIST);
	            this.state = 135;
	            this.match(terraformParser.PO);
	            this.state = 136;
	            this.type();
	            this.state = 137;
	            this.match(terraformParser.PF);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 139;
	            this.match(terraformParser.MAP);
	            this.state = 140;
	            this.match(terraformParser.PO);
	            this.state = 141;
	            this.type();
	            this.state = 142;
	            this.match(terraformParser.PF);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 144;
	            this.match(terraformParser.OBJECT);
	            this.state = 145;
	            this.match(terraformParser.PO);
	            this.state = 146;
	            this.object();
	            this.state = 147;
	            this.match(terraformParser.PF);
	            break;
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  object() {
	    const localctx = new ObjectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, terraformParser.RULE_object);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 153;
	        this._errHandler.sync(this);
	        let _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 153;
	        		this._errHandler.sync(this);
	        		var la_ = this._interp.adaptivePredict(this._input, 9, this._ctx);
	        		switch (la_) {
	        		case 1:
	        		    this.state = 151;
	        		    this.complexField();
	        		    break;

	        		case 2:
	        		    this.state = 152;
	        		    this.field();
	        		    break;
	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 155;
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
	        } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  field() {
	    const localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, terraformParser.RULE_field);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        _la = this._input.LA(1);
	        if (!(_la === terraformParser.SOURCE || _la === terraformParser.IDENTIFIER)) {
	        this._errHandler.recoverInline(this);
	        } else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 158;
	        this.match(terraformParser.EQUAL);
	        this.state = 159;
	        this.expression();
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  complexField() {
	    const localctx = new ComplexFieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, terraformParser.RULE_complexField);
	    let _la = 0; // Token type
	    try {
	        this.state = 177;
	        this._errHandler.sync(this);
	        const la_ = this._interp.adaptivePredict(this._input, 12, this._ctx);
	        switch (la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 161;
	            this.match(terraformParser.IDENTIFIER);
	            this.state = 162;
	            this.match(terraformParser.AO);
	            this.state = 163;
	            this.object();
	            this.state = 164;
	            this.match(terraformParser.AF);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 166;
	            this.match(terraformParser.IDENTIFIER);
	            this.state = 167;
	            this.match(terraformParser.EQUAL);
	            this.state = 168;
	            this.match(terraformParser.AO);
	            this.state = 172;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 169;
	                this.match(terraformParser.STRING);
	                this.state = 170;
	                this.match(terraformParser.EQUAL);
	                this.state = 171;
	                this.match(terraformParser.STRING);
	                this.state = 174;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while (_la === terraformParser.STRING);
	            this.state = 176;
	            this.match(terraformParser.AF);
	            break;
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  validation() {
	    const localctx = new ValidationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, terraformParser.RULE_validation);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 179;
	        this.match(terraformParser.AO);
	        this.state = 180;
	        this.match(terraformParser.CONDITION);
	        this.state = 181;
	        this.match(terraformParser.EQUAL);
	        this.state = 183;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 182;
	            this.condition();
	            this.state = 185;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while ((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << terraformParser.BOOLEANOP) | (1 << terraformParser.BOOLEAN) | (1 << terraformParser.IDENTIFIER) | (1 << terraformParser.STRING) | (1 << terraformParser.NUMBER))) !== 0));
	        this.state = 187;
	        this.match(terraformParser.ERROR);
	        this.state = 188;
	        this.match(terraformParser.EQUAL);
	        this.state = 189;
	        this.match(terraformParser.STRING);
	        this.state = 190;
	        this.match(terraformParser.AF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  condition() {
	    const localctx = new ConditionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, terraformParser.RULE_condition);
	    try {
	        this.state = 197;
	        this._errHandler.sync(this);
	        switch (this._input.LA(1)) {
	        case terraformParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 192;
	            this.match(terraformParser.STRING);
	            break;
	        case terraformParser.NUMBER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 193;
	            this.match(terraformParser.NUMBER);
	            break;
	        case terraformParser.BOOLEAN:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 194;
	            this.match(terraformParser.BOOLEAN);
	            break;
	        case terraformParser.BOOLEANOP:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 195;
	            this.match(terraformParser.BOOLEANOP);
	            break;
	        case terraformParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 196;
	            this.functionCall();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  expression() {
	    const localctx = new ExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, terraformParser.RULE_expression);
	    try {
	        this.state = 205;
	        this._errHandler.sync(this);
	        const la_ = this._interp.adaptivePredict(this._input, 15, this._ctx);
	        switch (la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 199;
	            this.match(terraformParser.NUMBER);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 200;
	            this.match(terraformParser.BOOLEAN);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 201;
	            this.array();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 202;
	            this.complexExpression(0);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 203;
	            this.match(terraformParser.STRING);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 204;
	            this.type();
	            break;
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  functionCall() {
	    const localctx = new FunctionCallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, terraformParser.RULE_functionCall);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 207;
	        this.match(terraformParser.IDENTIFIER);
	        this.state = 208;
	        this.match(terraformParser.PO);
	        this.state = 209;
	        this.expression();
	        this.state = 214;
	        this._errHandler.sync(this);
	        let _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
	        while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if (_alt === 1) {
	                this.state = 210;
	                this.match(terraformParser.VIRG);
	                this.state = 211;
	                this.expression();
	            }
	            this.state = 216;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
	        }

	        this.state = 218;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if (_la === terraformParser.VIRG) {
	            this.state = 217;
	            this.match(terraformParser.VIRG);
	        }

	        this.state = 220;
	        this.match(terraformParser.PF);
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  complexExpression(_p) {
    if (_p === undefined) {
		    _p = 0;
    }
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ComplexExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 40;
	    this.enterRecursionRule(localctx, 40, terraformParser.RULE_complexExpression, _p);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 247;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);
	        switch (la_) {
	        case 1:
	            this.state = 223;
	            this.match(terraformParser.IDENTIFIER);
	            break;

	        case 2:
	            this.state = 225;
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 224;
	            		_la = this._input.LA(1);
	            		if (!(_la === terraformParser.TIRET || _la === terraformParser.IDENTIFIER)) {
	            		this._errHandler.recoverInline(this);
	            		} else {
	            			this._errHandler.reportMatch(this);
	            		    this.consume();
	            		}
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 227;
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
	            } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
	            break;

	        case 3:
	            this.state = 229;
	            this.match(terraformParser.OPEN);
	            this.state = 237;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 237;
	                this._errHandler.sync(this);
	                switch (this._input.LA(1)) {
	                case terraformParser.IDENTIFIERS:
	                    this.state = 230;
	                    this.match(terraformParser.IDENTIFIERS);
	                    break;
	                case terraformParser.AUTRE:
	                    this.state = 231;
	                    this.match(terraformParser.AUTRE);
	                    break;
	                case terraformParser.WSS:
	                    this.state = 233;
	                    this._errHandler.sync(this);
	                    var _alt = 1;
	                    do {
	                    	switch (_alt) {
	                    	case 1:
	                    		this.state = 232;
	                    		this.match(terraformParser.WSS);
	                    		break;
	                    	default:
	                    		throw new antlr4.error.NoViableAltException(this);
	                    	}
	                    	this.state = 235;
	                    	this._errHandler.sync(this);
	                    	_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
	                    } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 239;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while (((((_la - 36)) & ~0x1f) == 0 && ((1 << (_la - 36)) & ((1 << (terraformParser.IDENTIFIERS - 36)) | (1 << (terraformParser.WSS - 36)) | (1 << (terraformParser.AUTRE - 36)))) !== 0));
	            this.state = 241;
	            this.match(terraformParser.CLOSE);
	            break;

	        case 4:
	            this.state = 242;
	            this.match(terraformParser.STRING);
	            this.state = 243;
	            this.complexExpression(0);
	            this.state = 244;
	            this.match(terraformParser.STRING);
	            break;

	        case 5:
	            this.state = 246;
	            this.functionCall();
	            break;
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 262;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
	        while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if (_alt === 1) {
	                if (this._parseListeners !== null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 260;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input, 23, this._ctx);
	                switch (la_) {
	                case 1:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, terraformParser.RULE_complexExpression);
	                    this.state = 249;
	                    if (!(this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 6)');
	                    }
	                    this.state = 250;
	                    this.match(terraformParser.POINT);
	                    this.state = 251;
	                    this.complexExpression(7);
	                    break;

	                case 2:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, terraformParser.RULE_complexExpression);
	                    this.state = 252;
	                    if (!(this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 5)');
	                    }
	                    this.state = 253;
	                    this.match(terraformParser.CO);
	                    this.state = 254;
	                    this.index();
	                    this.state = 255;
	                    this.match(terraformParser.CF);
	                    break;

	                case 3:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, terraformParser.RULE_complexExpression);
	                    this.state = 257;
	                    if (!(this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 4)');
	                    }
	                    this.state = 258;
	                    this.match(terraformParser.POINT);
	                    this.state = 259;
	                    this.index();
	                    break;
	                }
	            }
	            this.state = 264;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
	        }
	    } catch (error) {
	        if (error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx);
	    }
	    return localctx;
  }

  array() {
	    const localctx = new ArrayContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, terraformParser.RULE_array);
	    let _la = 0; // Token type
	    try {
	        this.state = 281;
	        this._errHandler.sync(this);
	        const la_ = this._interp.adaptivePredict(this._input, 27, this._ctx);
	        switch (la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 265;
	            this.match(terraformParser.CO);
	            this.state = 266;
	            this.match(terraformParser.CF);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 267;
	            this.match(terraformParser.CO);
	            this.state = 268;
	            this.expression();
	            this.state = 273;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
	            while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if (_alt === 1) {
	                    this.state = 269;
	                    this.match(terraformParser.VIRG);
	                    this.state = 270;
	                    this.expression();
	                }
	                this.state = 275;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
	            }

	            this.state = 277;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if (_la === terraformParser.VIRG) {
	                this.state = 276;
	                this.match(terraformParser.VIRG);
	            }

	            this.state = 279;
	            this.match(terraformParser.CF);
	            break;
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }

  index() {
	    const localctx = new IndexContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, terraformParser.RULE_index);
	    let _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 283;
	        _la = this._input.LA(1);
	        if (!(_la === terraformParser.MULT || _la === terraformParser.NUMBER)) {
	        this._errHandler.recoverInline(this);
	        } else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if (re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
  }
}

terraformParser.EOF = antlr4.Token.EOF;
terraformParser.MODULE = 1;
terraformParser.DATA = 2;
terraformParser.SOURCE = 3;
terraformParser.PROVIDER = 4;
terraformParser.TERRAFORM = 5;
terraformParser.RESOURCE = 6;
terraformParser.VARIABLE = 7;
terraformParser.OUTPUT = 8;
terraformParser.LIST = 9;
terraformParser.MAP = 10;
terraformParser.OBJECT = 11;
terraformParser.CONDITION = 12;
terraformParser.ERROR = 13;
terraformParser.AO = 14;
terraformParser.AF = 15;
terraformParser.EQUAL = 16;
terraformParser.PO = 17;
terraformParser.PF = 18;
terraformParser.CO = 19;
terraformParser.CF = 20;
terraformParser.VIRG = 21;
terraformParser.POINT = 22;
terraformParser.TIRET = 23;
terraformParser.MULT = 24;
terraformParser.BOOLEANOP = 25;
terraformParser.BOOLEAN = 26;
terraformParser.TYPE = 27;
terraformParser.IDENTIFIER = 28;
terraformParser.STRING = 29;
terraformParser.NUMBER = 30;
terraformParser.COMMENT = 31;
terraformParser.LINE_COMMENT = 32;
terraformParser.HAS_COMMENT = 33;
terraformParser.WS = 34;
terraformParser.OPEN = 35;
terraformParser.IDENTIFIERS = 36;
terraformParser.WSS = 37;
terraformParser.NUMBERS = 38;
terraformParser.AUTRE = 39;
terraformParser.CLOSE = 40;

terraformParser.RULE_file = 0;
terraformParser.RULE_directive = 1;
terraformParser.RULE_dataDirective = 2;
terraformParser.RULE_moduleDirective = 3;
terraformParser.RULE_moduleSource = 4;
terraformParser.RULE_providerDirective = 5;
terraformParser.RULE_terraformDirective = 6;
terraformParser.RULE_resourceDirective = 7;
terraformParser.RULE_variableDirective = 8;
terraformParser.RULE_outputDirective = 9;
terraformParser.RULE_name = 10;
terraformParser.RULE_providerType = 11;
terraformParser.RULE_type = 12;
terraformParser.RULE_object = 13;
terraformParser.RULE_field = 14;
terraformParser.RULE_complexField = 15;
terraformParser.RULE_validation = 16;
terraformParser.RULE_condition = 17;
terraformParser.RULE_expression = 18;
terraformParser.RULE_functionCall = 19;
terraformParser.RULE_complexExpression = 20;
terraformParser.RULE_array = 21;
terraformParser.RULE_index = 22;

class FileContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_file;
  }

  directive = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(DirectiveContext);
	    }
	        return this.getTypedRuleContext(DirectiveContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterFile(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitFile(this);
    }
  }
}

class DirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_directive;
  }

  providerDirective() {
	    return this.getTypedRuleContext(ProviderDirectiveContext, 0);
  }

  terraformDirective() {
	    return this.getTypedRuleContext(TerraformDirectiveContext, 0);
  }

  resourceDirective() {
	    return this.getTypedRuleContext(ResourceDirectiveContext, 0);
  }

  variableDirective() {
	    return this.getTypedRuleContext(VariableDirectiveContext, 0);
  }

  outputDirective() {
	    return this.getTypedRuleContext(OutputDirectiveContext, 0);
  }

  moduleDirective() {
	    return this.getTypedRuleContext(ModuleDirectiveContext, 0);
  }

  dataDirective() {
	    return this.getTypedRuleContext(DataDirectiveContext, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitDirective(this);
    }
  }
}

class DataDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_dataDirective;
  }

  DATA() {
	    return this.getToken(terraformParser.DATA, 0);
  }

  providerType() {
	    return this.getTypedRuleContext(ProviderTypeContext, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  object = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    }
	        return this.getTypedRuleContext(ObjectContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterDataDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitDataDirective(this);
    }
  }
}

class ModuleDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_moduleDirective;
  }

  MODULE() {
	    return this.getToken(terraformParser.MODULE, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  moduleSource = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ModuleSourceContext);
	    }
	        return this.getTypedRuleContext(ModuleSourceContext, i);
  };

  object = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    }
	        return this.getTypedRuleContext(ObjectContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterModuleDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitModuleDirective(this);
    }
  }
}

class ModuleSourceContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_moduleSource;
  }

  SOURCE() {
	    return this.getToken(terraformParser.SOURCE, 0);
  }

  EQUAL() {
	    return this.getToken(terraformParser.EQUAL, 0);
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterModuleSource(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitModuleSource(this);
    }
  }
}

class ProviderDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_providerDirective;
  }

  PROVIDER() {
	    return this.getToken(terraformParser.PROVIDER, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  object() {
	    return this.getTypedRuleContext(ObjectContext, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterProviderDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitProviderDirective(this);
    }
  }
}

class TerraformDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_terraformDirective;
  }

  TERRAFORM() {
	    return this.getToken(terraformParser.TERRAFORM, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  object = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    }
	        return this.getTypedRuleContext(ObjectContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterTerraformDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitTerraformDirective(this);
    }
  }
}

class ResourceDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_resourceDirective;
  }

  RESOURCE() {
	    return this.getToken(terraformParser.RESOURCE, 0);
  }

  providerType() {
	    return this.getTypedRuleContext(ProviderTypeContext, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  object() {
	    return this.getTypedRuleContext(ObjectContext, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterResourceDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitResourceDirective(this);
    }
  }
}

class VariableDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_variableDirective;
  }

  VARIABLE() {
	    return this.getToken(terraformParser.VARIABLE, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  object = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    }
	        return this.getTypedRuleContext(ObjectContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterVariableDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitVariableDirective(this);
    }
  }
}

class OutputDirectiveContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_outputDirective;
  }

  OUTPUT() {
	    return this.getToken(terraformParser.OUTPUT, 0);
  }

  name() {
	    return this.getTypedRuleContext(NameContext, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  object = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    }
	        return this.getTypedRuleContext(ObjectContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterOutputDirective(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitOutputDirective(this);
    }
  }
}

class NameContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_name;
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterName(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitName(this);
    }
  }
}

class ProviderTypeContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_providerType;
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterProviderType(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitProviderType(this);
    }
  }
}

class TypeContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_type;
  }

  TYPE() {
	    return this.getToken(terraformParser.TYPE, 0);
  }

  LIST() {
	    return this.getToken(terraformParser.LIST, 0);
  }

  PO() {
	    return this.getToken(terraformParser.PO, 0);
  }

  type() {
	    return this.getTypedRuleContext(TypeContext, 0);
  }

  PF() {
	    return this.getToken(terraformParser.PF, 0);
  }

  MAP() {
	    return this.getToken(terraformParser.MAP, 0);
  }

  OBJECT() {
	    return this.getToken(terraformParser.OBJECT, 0);
  }

  object() {
	    return this.getTypedRuleContext(ObjectContext, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterType(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitType(this);
    }
  }
}

class ObjectContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_object;
  }

  complexField = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ComplexFieldContext);
	    }
	        return this.getTypedRuleContext(ComplexFieldContext, i);
  };

  field = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(FieldContext);
	    }
	        return this.getTypedRuleContext(FieldContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterObject(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitObject(this);
    }
  }
}

class FieldContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_field;
  }

  EQUAL() {
	    return this.getToken(terraformParser.EQUAL, 0);
  }

  expression() {
	    return this.getTypedRuleContext(ExpressionContext, 0);
  }

  IDENTIFIER() {
	    return this.getToken(terraformParser.IDENTIFIER, 0);
  }

  SOURCE() {
	    return this.getToken(terraformParser.SOURCE, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterField(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitField(this);
    }
  }
}

class ComplexFieldContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_complexField;
  }

  IDENTIFIER() {
	    return this.getToken(terraformParser.IDENTIFIER, 0);
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  object() {
	    return this.getTypedRuleContext(ObjectContext, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  EQUAL = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.EQUAL);
	    }
	        return this.getToken(terraformParser.EQUAL, i);
  };

  STRING = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.STRING);
	    }
	        return this.getToken(terraformParser.STRING, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterComplexField(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitComplexField(this);
    }
  }
}

class ValidationContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_validation;
  }

  AO() {
	    return this.getToken(terraformParser.AO, 0);
  }

  CONDITION() {
	    return this.getToken(terraformParser.CONDITION, 0);
  }

  EQUAL = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.EQUAL);
	    }
	        return this.getToken(terraformParser.EQUAL, i);
  };

  ERROR() {
	    return this.getToken(terraformParser.ERROR, 0);
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  AF() {
	    return this.getToken(terraformParser.AF, 0);
  }

  condition = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    }
	        return this.getTypedRuleContext(ConditionContext, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterValidation(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitValidation(this);
    }
  }
}

class ConditionContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_condition;
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  NUMBER() {
	    return this.getToken(terraformParser.NUMBER, 0);
  }

  BOOLEAN() {
	    return this.getToken(terraformParser.BOOLEAN, 0);
  }

  BOOLEANOP() {
	    return this.getToken(terraformParser.BOOLEANOP, 0);
  }

  functionCall() {
	    return this.getTypedRuleContext(FunctionCallContext, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterCondition(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitCondition(this);
    }
  }
}

class ExpressionContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_expression;
  }

  NUMBER() {
	    return this.getToken(terraformParser.NUMBER, 0);
  }

  BOOLEAN() {
	    return this.getToken(terraformParser.BOOLEAN, 0);
  }

  array() {
	    return this.getTypedRuleContext(ArrayContext, 0);
  }

  complexExpression() {
	    return this.getTypedRuleContext(ComplexExpressionContext, 0);
  }

  STRING() {
	    return this.getToken(terraformParser.STRING, 0);
  }

  type() {
	    return this.getTypedRuleContext(TypeContext, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterExpression(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitExpression(this);
    }
  }
}

class FunctionCallContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_functionCall;
  }

  IDENTIFIER() {
	    return this.getToken(terraformParser.IDENTIFIER, 0);
  }

  PO() {
	    return this.getToken(terraformParser.PO, 0);
  }

  expression = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    }
	        return this.getTypedRuleContext(ExpressionContext, i);
  };

  PF() {
	    return this.getToken(terraformParser.PF, 0);
  }

  VIRG = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.VIRG);
	    }
	        return this.getToken(terraformParser.VIRG, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterFunctionCall(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitFunctionCall(this);
    }
  }
}

class ComplexExpressionContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_complexExpression;
  }

  IDENTIFIER = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.IDENTIFIER);
	    }
	        return this.getToken(terraformParser.IDENTIFIER, i);
  };

  TIRET = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.TIRET);
	    }
	        return this.getToken(terraformParser.TIRET, i);
  };

  OPEN() {
	    return this.getToken(terraformParser.OPEN, 0);
  }

  CLOSE() {
	    return this.getToken(terraformParser.CLOSE, 0);
  }

  IDENTIFIERS = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.IDENTIFIERS);
	    }
	        return this.getToken(terraformParser.IDENTIFIERS, i);
  };

  AUTRE = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.AUTRE);
	    }
	        return this.getToken(terraformParser.AUTRE, i);
  };

  WSS = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.WSS);
	    }
	        return this.getToken(terraformParser.WSS, i);
  };

  STRING = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.STRING);
	    }
	        return this.getToken(terraformParser.STRING, i);
  };

  complexExpression = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ComplexExpressionContext);
	    }
	        return this.getTypedRuleContext(ComplexExpressionContext, i);
  };

  functionCall() {
	    return this.getTypedRuleContext(FunctionCallContext, 0);
  }

  POINT() {
	    return this.getToken(terraformParser.POINT, 0);
  }

  CO() {
	    return this.getToken(terraformParser.CO, 0);
  }

  index() {
	    return this.getTypedRuleContext(IndexContext, 0);
  }

  CF() {
	    return this.getToken(terraformParser.CF, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterComplexExpression(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitComplexExpression(this);
    }
  }
}

class ArrayContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_array;
  }

  CO() {
	    return this.getToken(terraformParser.CO, 0);
  }

  CF() {
	    return this.getToken(terraformParser.CF, 0);
  }

  expression = function (i) {
	    if (i === undefined) {
	        i = null;
	    }
	    if (i === null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    }
	        return this.getTypedRuleContext(ExpressionContext, i);
  };

  VIRG = function (i) {
    if (i === undefined) {
      i = null;
    }
	    if (i === null) {
	        return this.getTokens(terraformParser.VIRG);
	    }
	        return this.getToken(terraformParser.VIRG, i);
  };

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterArray(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitArray(this);
    }
  }
}

class IndexContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = terraformParser.RULE_index;
  }

  NUMBER() {
	    return this.getToken(terraformParser.NUMBER, 0);
  }

  MULT() {
	    return this.getToken(terraformParser.MULT, 0);
  }

  enterRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.enterIndex(this);
    }
  }

  exitRule(listener) {
	    if (listener instanceof TerraformListener) {
	        listener.exitIndex(this);
    }
  }
}

terraformParser.FileContext = FileContext;
terraformParser.DirectiveContext = DirectiveContext;
terraformParser.DataDirectiveContext = DataDirectiveContext;
terraformParser.ModuleDirectiveContext = ModuleDirectiveContext;
terraformParser.ModuleSourceContext = ModuleSourceContext;
terraformParser.ProviderDirectiveContext = ProviderDirectiveContext;
terraformParser.TerraformDirectiveContext = TerraformDirectiveContext;
terraformParser.ResourceDirectiveContext = ResourceDirectiveContext;
terraformParser.VariableDirectiveContext = VariableDirectiveContext;
terraformParser.OutputDirectiveContext = OutputDirectiveContext;
terraformParser.NameContext = NameContext;
terraformParser.ProviderTypeContext = ProviderTypeContext;
terraformParser.TypeContext = TypeContext;
terraformParser.ObjectContext = ObjectContext;
terraformParser.FieldContext = FieldContext;
terraformParser.ComplexFieldContext = ComplexFieldContext;
terraformParser.ValidationContext = ValidationContext;
terraformParser.ConditionContext = ConditionContext;
terraformParser.ExpressionContext = ExpressionContext;
terraformParser.FunctionCallContext = FunctionCallContext;
terraformParser.ComplexExpressionContext = ComplexExpressionContext;
terraformParser.ArrayContext = ArrayContext;
terraformParser.IndexContext = IndexContext;
