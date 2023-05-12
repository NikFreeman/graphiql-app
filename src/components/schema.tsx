import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { makeRequest } from '../utils/request';

type Arg = {
  name: string;
  description: string;
  type: Type;
  defaultValue: null;
};

type Field = {
  name: string;
  description: string;
  args: Arg[];
  type: Type;
};

type Type = {
  kind: 'OBJECT' | 'LIST' | 'NON_NULL' | 'SCALAR' | 'ENUM';
  name: string;
  description?: string;
  fields?: Field[];
  ofType?: Type | null;
};

type Directive = {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
};

type Schema = {
  types: Type[];
  directives: Directive[];
};

const query =
  '\n query IntrospectionQuery {\n __schema {\n \n queryType { name }\n mutationType { name }\n subscriptionType { name }\n types {\n ...FullType\n }\n directives {\n name\n description\n \n locations\n args {\n ...InputValue\n }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n kind\n name\n ofType {\n kind\n name\n ofType {\n kind\n name\n }\n }\n }\n }\n }\n }\n }\n }\n';

let schema: Schema;
const getSchema = async () => {
  schema = await makeRequest(query, {}).then((res) => res.data.__schema);
  return schema;
};
getSchema();

function getTypeName(field: Field): string {
  return (
    field.type.name ??
    field.type.ofType?.name ??
    field.type.ofType?.ofType?.name ??
    field.type.ofType?.ofType?.ofType?.name
  );
}

function getTypes(field: Field): string {
  return `${field.name}${field.args.length ? '(' : ''}${field.args.map(
    (arg) =>
      ' ' +
      arg.name +
      ': ' +
      (!arg.type.ofType
        ? ' ' + arg.type.name
        : (arg.type.ofType.ofType?.ofType?.name ||
            arg.type.ofType.ofType?.name ||
            arg.type.ofType.name) + '! ')
  )}${field.args.length ? '): ' : ': '}${field.type.kind === 'LIST' ? '[' : ''}${getTypeName(
    field
  )}${field.type.kind === 'LIST' ? ']' : ''}`;
}

export function Schema() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton onClick={() => console.log(schema)}>
            <Box as="span" flex="1" textAlign="left">
              Query: {schema.types[0].name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontSize="sm">
            {schema.types[0].description}
          </Box>
        </h2>
        <AccordionPanel pb={4}>
          <SchemaTree typeName={schema.types[0].name} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

interface DrawTreeProps {
  field?: Field;
  typeName?: string;
}

function SchemaTree({ field, typeName }: DrawTreeProps) {
  const fieldTypeName = typeName ? typeName : field && getTypeName(field);
  const type = schema.types.find((type) => type.name === fieldTypeName);
  if (type) {
    return (
      <Accordion allowToggle>
        {type.fields?.map((field) => {
          return (
            <AccordionItem key={field.name}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {field.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="sm">
                      {field.description}
                    </Box>
                  </h2>
                  <AccordionPanel pb={4}>
                    {getTypes(field)}
                    <h4>Type details</h4>
                    {isExpanded && <SchemaTree field={field} />}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  } else return <></>;
}
