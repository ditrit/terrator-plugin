const root = `{% for _block in components %}
{{ _block.definition.blockType }} {% if ['resource','data'].includes(_block.definition.blockType) %}"{{ _block.definition.type }}" {% endif %}{% if ['provider', 'module'].includes(_block.definition.blockType) %}"{{ _block.definition.type }}"{% else %}"{{ _block.id }}"{% endif %} {
{% for attribute in _block.attributes %}{% set level = 1 %}
{% include "attribute" ignore missing %}
{% endfor %}
}

{% endfor %}`;

const attribute = `{% if attribute.type == 'Object' %}
{{ attribute.name | indent(level * 4, true) }} {
{% set level = level+1 %}{% for attr in attribute.value %}{% set attribute = attr %}
{% include "attribute" ignore missing %}
{% set attribute = attr %}
{% endfor %}{% set level = level-1 %}
{{ "}" | indent(level * 4, true)  }}
{% else %}
{{ attribute.name | indent(level * 4, true)}} = {{ attribute.value | dump }}
{% endif %}
`;

export default {
  root,
  attribute,
};
