const TerraformTemplate = `{% for _block in components %}
{{ _block.definition.blockType }} {% if ['resource','data'].includes(_block.definition.blockType) %}"{{ _block.definition.type }}" {% endif %}"{{ _block.name }}" {
{% for attribute in _block.attributes %}
    {% if attribute.type == 'Object' %}
    {{ attribute.name }} {
        {% for attr in attribute.value %}
        {{ attr.name }} = {{ attr.value | dump }}
        {% endfor %}
    }
    {% else %}
    {{ attribute.name }} = {{ attribute.value | dump }}
    {% endif %}
{% endfor %}
}

{% endfor %}`;

export default TerraformTemplate;
