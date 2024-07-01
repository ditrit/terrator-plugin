/* eslint class-methods-use-this: 0 */
import antlr4 from 'antlr4';
import TerraformVariable from 'src/models/TerraformVariable';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

const getText = (ctx) => ctx.getText().replaceAll('"', '').trim();

class TerraformListener extends antlr4.tree.ParseTreeListener {
  constructor(pluginData) {
    super();
    this.pluginData = pluginData;
    this.definitions = pluginData.definitions.components;

    this.currentComponent = null;
    this.currentBlockType = null;
    this.currentField = null;
    this.currentObjectField = null;
    this.currentFile = null;
    this.fieldsTree = [];
    this.currentVariable = null;
    this.currentVariableField = null;
    // Map of ids in order to have for each externalId, the associated id.
    // key -> type.externalId, value -> id
    this.ids = new Map();
    // We need this idCounter because we can't use pluginData to generate the id.
    this.idCounter = 1;
  }

  getUnknownDefinition(type) {
    return new TerraformComponentDefinition({
      isContainer: false,
      model: 'DefaultModel',
      icon: 'unknown',
      type: type || 'unknown',
      blockType: this.currentBlockType,
    });
  }

  addComponent() {
    const typeExternalId = `${this.currentComponent.definition.type}.${this.currentComponent.externalId}`;

    this.currentComponent.path = this.currentFile.path;
    this.currentComponent.id = this.createIdFromTypeExternalId(typeExternalId);
    this.pluginData.components.push(this.currentComponent);
    this.currentComponent = null;
    this.currentBlockType = null;
    this.fieldsTree = [];
  }

  addVariable() {
    this.currentVariable.path = this.currentFile.path;
    this.pluginData.variables.push(this.currentVariable);
    this.currentVariable = null;
    this.currentVariableField = null;
  }

  getAttributeDefinition(object, name) {
    return object.definition?.definedAttributes.find((def) => def.name === name) || null;
  }

  isVariable() {
    return (this.currentBlockType === 'variable' || this.currentBlockType === 'output');
  }

  /**
   * Convert the type to match one of a variable.
   * @param {string} type - Attribute type.
   * @returns {string} Type of the variable.
   */
  attributeTypeToVariableType(type) {
    switch (type) {
      case 'String':
        return 'string';
      case 'Number':
        return 'number';
      case 'Boolean':
        return 'bool';
      default:
        return 'string';
    }
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
    this.currentComponent = new TerraformComponent();
  }

  // Exit a parse tree produced by terraformParser#resource.
  exitResource() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#data.
  enterData() {
    this.currentBlockType = 'data';
    this.currentComponent = new TerraformComponent();
  }

  // Exit a parse tree produced by terraformParser#data.
  exitData() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#provider.
  enterProvider() {
    this.currentBlockType = 'provider';
    this.currentComponent = new TerraformComponent();
  }

  // Exit a parse tree produced by terraformParser#provider.
  exitProvider() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#output.
  enterOutput() {
    this.currentBlockType = 'output';
    this.currentVariable = new TerraformVariable({ category: 'output' });
  }

  // Exit a parse tree produced by terraformParser#output.
  exitOutput() {
    this.addVariable();
    this.currentBlockType = null;
  }

  // Enter a parse tree produced by terraformParser#local.
  enterLocal() {
    this.currentBlockType = 'local';
  }

  // Exit a parse tree produced by terraformParser#local.
  exitLocal() {
    this.currentBlockType = null;
  }

  // Enter a parse tree produced by terraformParser#module.
  enterModule(ctx) {
    this.currentBlockType = 'module';
    this.currentComponent = new TerraformComponent();
    const type = getText(ctx.name());
    this.currentComponent.definition = this.definitions
      .find((definition) => definition.blockType === 'module' && definition.type === type)
      || this.getUnknownDefinition(type);
  }

  // Exit a parse tree produced by terraformParser#module.
  exitModule() {
    this.addComponent();
  }

  // Enter a parse tree produced by terraformParser#variable.
  enterVariable() {
    this.currentBlockType = 'variable';
    this.currentVariable = new TerraformVariable({ category: 'variable' });
  }

  // Exit a parse tree produced by terraformParser#variable.
  exitVariable() {
    this.addVariable();
    this.currentBlockType = null;
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
        && definition.type === type) || this.getUnknownDefinition(type);

    if (this.currentBlockType === 'provider') {
      // special case for provider, we do not have any externalId
      // so we will use the `type` as the externalId
      const typeExternalId = `${type}.${type}`;

      this.currentComponent.externalId = type;
      this.currentComponent.id = this.createIdFromTypeExternalId(typeExternalId);
    }
  }

  // Exit a parse tree produced by terraformParser#resourcetype.
  exitResourcetype() {
  }

  // Enter a parse tree produced by terraformParser#name.
  enterName() {
  }

  // Exit a parse tree produced by terraformParser#name.
  exitName(ctx) {
    if (this.currentComponent) {
      this.currentComponent.externalId = getText(ctx);
    } else if (this.currentVariable) {
      this.currentVariable.name = getText(ctx);
    }
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
  enterArgument(ctx) {
    if (ctx.expression()?.section()?.map_()) {
      if (this.currentObjectField) {
        this.fieldsTree.push(this.currentObjectField);
      }
      const name = ctx.identifier().getText();

      this.currentObjectField = new TerraformComponentAttribute({
        name,
        type: 'Object',
        value: [],
        definition: this.getAttributeDefinition(
          this.currentObjectField || this.currentComponent,
          name,
        ),
      });
    }

    if (this.isVariable()) {
      this.currentVariableField = ctx.identifier().getText();

      if (this.currentVariableField === 'default') {
        this.currentVariableField = 'defaultValue';
      }
    } else if (this.currentBlockType === 'local') {
      this.currentVariable = new TerraformVariable({
        category: 'local',
        name: getText(ctx.identifier()),
      });
      this.currentVariableField = 'value';
    } else {
      this.currentField = new TerraformComponentAttribute();
    }
  }

  // Exit a parse tree produced by terraformParser#argument.
  exitArgument(ctx) {
    if (this.isVariable()) {
      const argName = ctx.identifier().getText();

      if (argName === 'description') {
        this.currentVariable.description = getText(ctx.expression());
      } else if (argName === 'sensitive' || argName === 'nullable') {
        this.currentVariable[argName] = getText(ctx.expression()) === 'true';
      }
    } else if (this.currentBlockType === 'local') {
      this.addVariable();
    } else if (this.currentField) {
      this.currentField.name = ctx.identifier().getText();

      if (this.currentObjectField) {
        this.currentObjectField.value.push(this.currentField);
        this.currentField.definition = this.getAttributeDefinition(
          this.currentObjectField,
          this.currentField.name,
        );
      } else {
        this.currentComponent.attributes.push(this.currentField);
        this.currentField.definition = this.getAttributeDefinition(
          this.currentComponent,
          this.currentField.name,
        );
      }
    } else {
      this.currentObjectField.name = ctx.identifier().getText();

      if (this.fieldsTree.length > 0) {
        const field = this.fieldsTree.pop();
        field.value.push(this.currentObjectField);
        this.currentObjectField = field;
      } else {
        this.currentComponent.attributes.push(this.currentObjectField);
        this.currentObjectField = null;
      }
    }

    if (this.currentField?.definition?.type === 'Reference') {
      const match = /([^.]+\.[^.]+)/.exec(this.currentField.value);

      if (match) {
        if (Array.isArray(this.currentField.value)) {
          this.currentField.value = this.currentField.value.map((v) => {
            const matching = /([^.]+\.[^.]+)\.([^.]+)/.exec(v);
            // matching[1] is `type.externalId`
            return this.createIdFromTypeExternalId(matching[1]);
          });
        } else {
          this.currentField.value = this.createIdFromTypeExternalId(this.currentField.value);
        }
      }
    }

    if (this.currentField?.definition?.type === 'Link') {
      this.currentField.type = 'Array';
      if (Array.isArray(this.currentField.value)) {
        this.currentField.value = this.currentField.value.map((v) => {
          const match = /([^.]+\.[^.]+)\.([^.]+)/.exec(v);
          // match[1] is `type.externalId`
          return this.createIdFromTypeExternalId(match[1]);
        });
      }

      const match = /([^.]+\.[^.]+)(\.([^.]+))?/.exec(this.currentField.value);

      if (match) {
        this.currentField.value = [this.createIdFromTypeExternalId(match[1])];
      }
    }

    this.currentField = null;
  }

  /**
   * Create the id of a component associated to its typeExternalId.
   * The typeExternalId is the unique composition of component's type and externalId.
   * The created id will be like `id_X` with `X` an increasing integer and will be unique for each
   * component.
   * @param {string} typeExternalId - The typeExternalId is the unique concatenation of the
   * component's type and externalId and represented as `type.externalId`.
   * @returns {string} The id of the component.
   */
  createIdFromTypeExternalId(typeExternalId) {
    if (this.ids.has(typeExternalId)) {
      return this.ids.get(typeExternalId);
    }

    const id = `id_${this.idCounter}`;
    this.idCounter += 1;
    this.ids.set(typeExternalId, id);

    return id;
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
  enterSection(ctx) {
    if (!this.currentField && !this.isVariable()) {
      if (ctx.val()?.identifier()) {
        const val = getText(ctx.val());
        this.currentField = new TerraformComponentAttribute({
          type: 'String',
          value: val === 'null' ? null : val,
        });
      }
    }
  }

  // Exit a parse tree produced by terraformParser#section.
  exitSection() {
  }

  // Enter a parse tree produced by terraformParser#val.
  enterVal() {
  }

  getFieldValueTypeFromContext(ctx) {
    if (ctx.BOOL()) {
      return {
        value: ctx.BOOL().getText() === 'true',
        type: 'Boolean',
      };
    }

    if (ctx.signed_number()) {
      return {
        value: parseFloat(ctx.signed_number().getText()),
        type: 'Number',
      };
    }

    const value = getText(ctx);

    return {
      value: value === 'null' ? null : value,
      type: 'String',
    };
  }

  // Exit a parse tree produced by terraformParser#val.
  exitVal(ctx) {
    const { value, type } = this.getFieldValueTypeFromContext(ctx);

    if (this.isVariable() || this.currentBlockType === 'local') {
      const listType = this.attributeTypeToVariableType(type);

      if (Array.isArray(this.currentVariable[this.currentVariableField])) {
        this.currentVariable[this.currentVariableField].push(value);

        if (this.currentVariableField === 'defaultValue' || this.currentVariableField === 'value') {
          this.currentVariable.type = `list(${listType})`;
        }
      } else {
        this.currentVariable[this.currentVariableField] = value;

        if (this.currentVariableField === 'defaultValue' || this.currentVariableField === 'value') {
          this.currentVariable.type = listType;
        }
      }
    } else if (this.currentField.type === 'Array') {
      this.currentField.value.push(value);
    } else {
      this.currentField.value = value;
      this.currentField.type = type;
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
    if (!this.currentField) {
      this.currentField = new TerraformComponentAttribute({
        type: 'Array',
        value: [],
      });
    } else if (this.currentField) {
      this.currentField.type = 'Array';
      this.currentField.value = [];
    }

    if (this.isVariable()) {
      this.currentVariable[this.currentVariableField] = [];
    } else if (this.currentBlockType === 'local') {
      this.currentVariable.value = [];
    }
  }

  // Exit a parse tree produced by terraformParser#list_.
  exitList_() {
    if (this.currentField) {
      this.currentField.type = 'Array';
    }
  }

  // Enter a parse tree produced by terraformParser#map_.
  enterMap_() {
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
