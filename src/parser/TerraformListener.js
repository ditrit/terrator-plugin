/* eslint class-methods-use-this: 0 */
import antlr4 from 'antlr4';
import {
  Component,
  ComponentAttribute,
} from 'leto-modelizer-plugin-core';

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
    this.currentComplexeField = null;
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

  // Enter a parse tree produced by terraformParser#file.
  enterFile() {
  }

  // Exit a parse tree produced by terraformParser#file.
  exitFile() {
  }

  // Enter a parse tree produced by terraformParser#directive.
  enterDirective() {
  }

  // Exit a parse tree produced by terraformParser#directive.
  exitDirective() {
  }

  // Enter a parse tree produced by terraformParser#dataDirective.
  enterDataDirective() {
    this.currentBlockType = 'data';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#dataDirective.
  exitDataDirective() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#moduleDirective.
  enterModuleDirective(ctx) {
    this.currentBlockType = 'module';
    this.currentComponent = new Component();
    const type = getText(ctx.name());
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'module' && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#moduleDirective.
  exitModuleDirective() {
    this.currentComponent.id = null;
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#moduleSource.
  enterModuleSource() {
  }

  // Exit a parse tree produced by terraformParser#moduleSource.
  exitModuleSource(ctx) {
    this.currentComponent.attributes.push(new ComponentAttribute({
      name: 'source',
      value: getText(ctx.STRING()),
      type: 'String',
    }));
  }

  // Enter a parse tree produced by terraformParser#providerDirective.
  enterProviderDirective(ctx) {
    this.currentBlockType = 'provider';
    this.currentComponent = new Component();
    const name = getText(ctx.name());
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'provider'
        && definition.provider === name) || null;
  }

  // Exit a parse tree produced by terraformParser#providerDirective.
  exitProviderDirective() {
    this.currentComponent.id = null;
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#terraformDirective.
  enterTerraformDirective() {
  }

  // Exit a parse tree produced by terraformParser#terraformDirective.
  exitTerraformDirective() {
  }

  // Enter a parse tree produced by terraformParser#resourceDirective.
  enterResourceDirective() {
    this.currentBlockType = 'resource';
    this.currentComponent = new Component();
  }

  // Exit a parse tree produced by terraformParser#resourceDirective.
  exitResourceDirective() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#variableDirective.
  enterVariableDirective(ctx) {
    const type = getText(ctx.name());
    this.currentBlockType = 'variable';
    this.currentComponent = new Component();
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'variable' && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#variableDirective.
  exitVariableDirective() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#outputDirective.
  enterOutputDirective() {
  }

  // Exit a parse tree produced by terraformParser#outputDirective.
  exitOutputDirective() {
  }

  // Enter a parse tree produced by terraformParser#name.
  enterName() {
  }

  // Exit a parse tree produced by terraformParser#name.
  exitName(ctx) {
    this.currentComponent.id = getText(ctx);
  }

  // Enter a parse tree produced by terraformParser#resourceType.
  enterProviderType(ctx) {
    const type = getText(ctx);
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === this.currentBlockType
        && definition.type === type) || null;
  }

  // Exit a parse tree produced by terraformParser#resourceType.
  exitProviderType() {
  }

  // Enter a parse tree produced by terraformParser#type.
  enterType() {
  }

  // Exit a parse tree produced by terraformParser#type.
  exitType() {
  }

  // Enter a parse tree produced by terraformParser#object.
  enterObject() {
  }

  // Exit a parse tree produced by terraformParser#object.
  exitObject() {
  }

  // Enter a parse tree produced by terraformParser#field.
  enterField() {
  }

  // Exit a parse tree produced by terraformParser#field.1
  exitField(ctx) {
    if (!this.currentField) {
      if (ctx.expression().BOOLEAN()) {
        this.currentField = new ComponentAttribute({
          type: 'Boolean',
          value: ctx.expression().BOOLEAN().getText() === 'true',
        });
      } else if (ctx.expression().NUMBER()) {
        this.currentField = new ComponentAttribute({
          type: 'Number',
          value: parseFloat(ctx.expression().NUMBER().getText()),
        });
      } else {
        this.currentField = new ComponentAttribute({
          type: 'String',
          value: ctx.expression().getText() === 'null' ? null : getText(ctx.expression()),
        });
      }
    }
    this.currentField.name = getText(ctx.IDENTIFIER());
    if (this.currentComplexeField) {
      this.currentComplexeField.value.push(this.currentField);
    } else {
      this.currentComponent.attributes
        .push(this.currentField);
    }

    if (this.currentComplexeField) {
      this.currentField.definition = this.getAttributeDefinition(
        this.currentComplexeField,
        this.currentField.name,
      );
    } else {
      this.currentField.definition = this.getAttributeDefinition(
        this.currentComponent,
        this.currentField.name,
      );
    }

    this.currentField = null;
  }

  // Enter a parse tree produced by terraformParser#complexField.
  enterComplexField(ctx) {
    const name = getText(ctx.IDENTIFIER());
    let definition;

    if (this.currentComplexeField !== null) {
      this.fieldsTree.push(this.currentComplexeField);
      definition = this.getAttributeDefinition(this.currentComplexeField, name);
    } else {
      definition = this.getAttributeDefinition(this.currentComponent, name);
    }

    this.currentComplexeField = new ComponentAttribute({
      name,
      value: [],
      type: 'Object',
      definition,
    });
  }

  // Exit a parse tree produced by terraformParser#complexField.
  exitComplexField() {
    if (this.fieldsTree.length > 0) {
      const field = this.fieldsTree.pop();

      field.value.push(this.currentComplexeField);
      this.currentComplexeField = field;
    } else {
      this.currentComponent.attributes.push(this.currentComplexeField);
      this.currentComplexeField = null;
    }
  }

  // Enter a parse tree produced by terraformParser#validation.
  enterValidation() {
  }

  // Exit a parse tree produced by terraformParser#validation.
  exitValidation() {
  }

  // Enter a parse tree produced by terraformParser#condition.
  enterCondition() {
  }

  // Exit a parse tree produced by terraformParser#condition.
  exitCondition() {
  }

  // Enter a parse tree produced by terraformParser#expression.
  enterExpression() {
  }

  // Exit a parse tree produced by terraformParser#expression.
  exitExpression() {
  }

  // Enter a parse tree produced by terraformParser#functionCall.
  enterFunctionCall() {
  }

  // Exit a parse tree produced by terraformParser#functionCall.
  exitFunctionCall() {
  }

  // Enter a parse tree produced by terraformParser#complexExpression.
  enterComplexExpression() {
  }

  // Exit a parse tree produced by terraformParser#complexExpression.
  exitComplexExpression() {
  }

  // Enter a parse tree produced by terraformParser#array.
  enterArray() {
    this.currentField = new ComponentAttribute();
  }

  // Exit a parse tree produced by terraformParser#array.
  exitArray(ctx) {
    this.currentField.type = 'Array';
    this.currentField.value = ctx.children
      .map((value) => getText(value))
      .filter((value) => value !== '[' && value !== ']' && value !== ',');
  }

  // Enter a parse tree produced by terraformParser#index.
  enterIndex() {
  }

  // Exit a parse tree produced by terraformParser#index.
  exitIndex() {
  }
}

export default TerraformListener;
