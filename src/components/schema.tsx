import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { makeRequest } from '../utils/request';

// import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       __schema: {
//         type: GraphQLString,
//         resolve() {
//           return 'world';
//         },
//       },
//     },
//   }),
// });
// const source = '{ hello }';

// graphql({ schema, source }).then((result) => {
//   // Prints
//   // {
//   //   data: { hello: "world" }
//   // }
//   console.log(result);
// });

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
          <Accordion allowToggle>
            {schema.types[0].fields?.map((field) => {
              return (
                <AccordionItem key={field.name}>
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
                    {`${field.name}( ${field.args.map(
                      (arg) =>
                        arg.name +
                        ': ' +
                        (!arg.type.ofType
                          ? arg.type.name
                          : (!arg.type.ofType.ofType
                              ? arg.type.ofType.name
                              : !arg.type.ofType.ofType.ofType
                              ? arg.type.ofType.ofType.name
                              : arg.type.ofType.ofType.ofType.name) + '!')
                    )}): ${
                      field.type.name ??
                      field.type.ofType?.name ??
                      field.type.ofType?.ofType?.name ??
                      field.type.ofType?.ofType?.ofType?.name
                    }`}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

// function DrowSchemaTree(field: object | null) {
//   if (field) {
//     return (
//       <Accordion allowToggle>
//         <AccordionItem>
//           <h2>
//             <AccordionButton>
//               <Box as="span" flex="1" textAlign="left">
//                 {field.name}
//               </Box>
//               <Box as="span" flex="1" textAlign="left">
//                 {field.description}
//               </Box>
//               <AccordionIcon />
//             </AccordionButton>
//           </h2>
//           {field.args && (
//             <AccordionPanel pb={4}>
//               {field.args.map((field) => {
//                 DrowSchemaTree(field);
//               })}
//             </AccordionPanel>
//           )}
//         </AccordionItem>
//       </Accordion>
//     );
//   }
// }
