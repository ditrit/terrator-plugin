/* eslint class-methods-use-this: 0 */
import antlr4 from 'antlr4';
import {
  Component,
} from 'leto-modelizer-plugin-core';

import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

const getText = (ctx) => ctx.getText().replaceAll('"', '').trim();

class TerraformListener extends antlr4.tree.ParseTreeListener {
  constructor(definitions) {
    super();
    this.definitions = definitions;
    this.components = [];
    this.errors = [];

    this.currentComponent = null;
    this.currentBlockType = null;
    this.currentField = null;
    this.currentObjectField = null;
    this.currentFile = null;
    this.fieldsTree = [];
  }

  addComponent() {
    this.currentComponent.path = this.currentFile.path;
    this.components.push(this.currentComponent);
    this.currentComponent = null;
    this.currentBlockType = null;
    this.fieldsTree = [];
  }

  getAttributeDefinition(object, name) {
    return object.definition?.definedAttributes.find((def) => def.name === name) || null;
  }

  // Enter a parse tree produced by terraformParser#file_.
  enterFile_() {
  }

  // Exit a parse tree produced by terraformParser#file_.
  exitFile_() {
  }

  // Enter a parse tree produced by terraformParser#terraform.
  enterTerraform() {
  }

  // Exit a parse tree produced by terraformParser#terraform.
  exitTerraform() {
  }

  // Enter a parse tree produced by terraformParser#resource.
  enterResource() {
    this.currentBlockType = 'resource';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#resource.
  exitResource() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#data.
  enterData() {
    this.currentBlockType = 'data';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#data.
  exitData() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#provider.
  enterProvider() {
    this.currentBlockType = 'provider';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#provider.
  exitProvider() {
    this.currentComponent.id = null;
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#output.
  enterOutput() {
    this.currentBlockType = 'output';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#output.
  exitOutput() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#local.
  enterLocal() {
  }

  // Exit a parse tree produced by terraformParser#local.
  exitLocal() {
  }

  // Enter a parse tree produced by terraformParser#module.
  enterModule(ctx) {
    this.currentBlockType = 'module';
    this.currentComponent = new Component();
    const type = getText(ctx.name());
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'module' && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#module.
  exitModule() {
    this.currentComponent.id = null;
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#variable.
  enterVariable(ctx) {
    const type = getText(ctx.name());
    this.currentBlockType = 'variable';
    this.currentComponent = new Component();
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'variable' && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#variable.
  exitVariable() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#block.
  enterBlock(ctx) {
    const name = getText(ctx.blocktype());
    let definition;

    if (this.currentObjectField) {
      this.fieldsTree.push(this.currentObjectField);
      definition = this.getAttributeDefinition(this.currentObjectField, name);
    } else {
      definition = this.getAttributeDefinition(this.currentComponent, name);
    }

    this.currentObjectField = new TerraformComponentAttribute({
      name,
      value: [],
      type: 'Object',
      definition,
      isDynamic: true,
    });
  }

  // Exit a parse tree produced by terraformParser#block.
  exitBlock() {
    if (this.fieldsTree.length > 0) {
      const field = this.fieldsTree.pop();

      field.value.push(this.currentObjectField);
      this.currentObjectField = field;
    } else {
      this.currentComponent.attributes.push(this.currentObjectField);
      this.currentObjectField = null;
    }
  }

  // Enter a parse tree produced by terraformParser#blocktype.
  enterBlocktype() {
  }

  // Exit a parse tree produced by terraformParser#blocktype.
  exitBlocktype() {
  }

  // Enter a parse tree produced by terraformParser#resourcetype.
  enterResourcetype(ctx) {
    const type = getText(ctx);
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === this.currentBlockType
        && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#resourcetype.
  exitResourcetype() {
  }

  // Enter a parse tree produced by terraformParser#name.
  enterName() {
  }

  // Exit a parse tree produced by terraformParser#name.
  exitName(ctx) {
    this.currentComponent.id = getText(ctx);
  }

  // Enter a parse tree produced by terraformParser#label.
  // Requires block to be defined
  enterLabel() {
  }

  // Exit a parse tree produced by terraformParser#label.
  // Requires block to be defined
  exitLabel() {
  }

  // Enter a parse tree produced by terraformParser#blockbody.
  enterBlockbody() {
  }

  // Exit a parse tree produced by terraformParser#blockbody.
  exitBlockbody() {
  }

  // Enter a parse tree produced by terraformParser#argument.
  enterArgument() {
  }

  // Exit a parse tree produced by terraformParser#argument.
  exitArgument(ctx) {
    if (this.currentField) {
      this.currentField.name = ctx.identifier().getText();
      if (this.currentObjectField) {
        this.currentObjectField.value.push(this.currentField);
      } else {
        this.currentComponent.attributes.push(this.currentField);
      }
      if (this.currentObjectField) {
        this.currentField.definition = this.getAttributeDefinition(
          this.currentObjectField,
          this.currentField.name,
        );
      } else {
        this.currentField.definition = this.getAttributeDefinition(
          this.currentComponent,
          this.currentField.name,
        );
      }
    } else {
      this.currentObjectField.name = ctx.identifier().getText();
      this.currentObjectField.definition = this.getAttributeDefinition(
        this.currentComponent,
        this.currentObjectField.name,
      );
      if (this.fieldsTree.length > 0) {
        const field = this.fieldsTree.pop();

        field.value.push(this.currentObjectField);
        this.currentObjectField = field;
      } else {
        this.currentComponent.attributes.push(this.currentObjectField);
        this.currentObjectField = null;
      }
    }

    this.currentField = null;
  }

  // Enter a parse tree produced by terraformParser#identifier.
  enterIdentifier() {
  }

  // Exit a parse tree produced by terraformParser#identifier.
  exitIdentifier() {
  }

  // Enter a parse tree produced by terraformParser#identifierchain.
  enterIdentifierchain() {
  }

  // Exit a parse tree produced by terraformParser#identifierchain.
  exitIdentifierchain() {
  }

  // Enter a parse tree produced by terraformParser#inline_index.
  enterInline_index() {
  }

  // Exit a parse tree produced by terraformParser#inline_index.
  exitInline_index() {
  }

  // Enter a parse tree produced by terraformParser#expression.
  enterExpression() {
  }

  // Exit a parse tree produced by terraformParser#expression.
  exitExpression() {
  }

  // Enter a parse tree produced by terraformParser#forloop.
  enterForloop() {
  }

  // Exit a parse tree produced by terraformParser#forloop.
  exitForloop() {
  }

  // Enter a parse tree produced by terraformParser#section.
  enterSection() {
  }

  // Exit a parse tree produced by terraformParser#section.
  exitSection() {
  }

  // Enter a parse tree produced by terraformParser#val.
  enterVal() {
  }

  // Exit a parse tree produced by terraformParser#val.
  exitVal(ctx) {
    if (!this.currentField) {
      if (ctx.BOOL()) {
        this.currentField = new TerraformComponentAttribute({
          type: 'Boolean',
          value: ctx.BOOL().getText() === 'true',
        });
      } else if (ctx.signed_number()) {
        this.currentField = new TerraformComponentAttribute({
          type: 'Number',
          value: parseFloat(ctx.signed_number().getText()),
        });
      } else {
        const val = getText(ctx);
        this.currentField = new TerraformComponentAttribute({
          type: 'String',
          value: val === 'null' ? null : val,
        });
      }
    }
  }

  // Enter a parse tree produced by terraformParser#functioncall.
  enterFunctioncall() {
  }

  // Exit a parse tree produced by terraformParser#functioncall.
  exitFunctioncall() {
  }

  // Enter a parse tree produced by terraformParser#functionname.
  enterFunctionname() {
  }

  // Exit a parse tree produced by terraformParser#functionname.
  exitFunctionname() {
  }

  // Enter a parse tree produced by terraformParser#functionarguments.
  enterFunctionarguments() {
  }

  // Exit a parse tree produced by terraformParser#functionarguments.
  exitFunctionarguments() {
  }

  // Enter a parse tree produced by terraformParser#index.
  enterIndex() {
  }

  // Exit a parse tree produced by terraformParser#index.
  exitIndex() {
  }

  // Enter a parse tree produced by terraformParser#filedecl.
  enterFiledecl() {
  }

  // Exit a parse tree produced by terraformParser#filedecl.
  exitFiledecl() {
  }

  // Enter a parse tree produced by terraformParser#list_.
  enterList_() {
  }

  // Exit a parse tree produced by terraformParser#list_.
  exitList_(ctx) {
    this.currentField.type = 'Array';
    this.currentField.value = ctx.children
      .map((value) => getText(value))
      .filter((value) => value !== '[' && value !== ']' && value !== ',');
  }

  // Enter a parse tree produced by terraformParser#map_.
  enterMap_() {
    if (this.currentObjectField) {
      this.fieldsTree.push(this.currentObjectField);
    }
    this.currentObjectField = new TerraformComponentAttribute({
      value: [],
      type: 'Object',
    });
  }

  // Exit a parse tree produced by terraformParser#map_.
  exitMap_() {
  }

  // Enter a parse tree produced by terraformParser#string.
  enterString() {
  }

  // Exit a parse tree produced by terraformParser#string.
  exitString() {
  }

  // Enter a parse tree produced by terraformParser#number.
  enterNumber() {
  }

  // Exit a parse tree produced by terraformParser#number.
  exitNumber() {
  }

  // Enter a parse tree produced by terraformParser#signed_number.
  enterSigned_number() {
  }

  // Exit a parse tree produced by terraformParser#signed_number.
  exitSigned_number() {
  }
}

export default TerraformListener;
