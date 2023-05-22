import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  SkeletonText,
  Text,
} from '@chakra-ui/react';

import { getSchema } from '../helpers/variables';
import { useEffect, useState } from 'react';

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
  kind: 'OBJECT' | 'LIST' | 'NON_NULL' | 'SCALAR' | 'ENUM' | 'INPUT_OBJECT';
  name: string;
  description?: string;
  fields?: Field[] | null;
  inputFields?: Arg[] | null;
  ofType?: Type | null;
};

type Directive = {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
};

export type SchemaType = {
  types: Type[];
  directives: Directive[];
};

function getTypeName(field: Field): string {
  return (
    field.type.name ??
    field.type.ofType?.name ??
    field.type.ofType?.ofType?.name ??
    field.type.ofType?.ofType?.ofType?.name
  );
}

function getArgTypeName(arg: Arg): string {
  return `${
    !arg.type.ofType
      ? ' ' + arg.type.name
      : (arg.type.ofType.ofType?.ofType?.name ||
          arg.type.ofType.ofType?.name ||
          arg.type.ofType.name) + '! '
  }`;
}

function GetTypes({ field }: DrawTreeProps) {
  return (
    <Box>
      {field && (
        <>
          <Text as="span" color={'tomato'}>
            {field.name}
          </Text>
          <Text as="span" color={'black'}>
            {field.args.length ? '(' : ''}
            {field.args.map((arg) => {
              return (
                <>
                  <Text as="span" color={'darkblue'}>
                    {' '}
                    {arg.name}:{' '}
                  </Text>
                  <Text as="span" color={'orange'}>
                    {getArgTypeName(arg)}
                  </Text>
                </>
              );
            })}
            {field.args.length ? '): ' : ': '}
          </Text>
          <Text as="span" color={'black'}>
            {field.type.kind === 'LIST' ? '[' : ''}
            <Text as="span" color={'orange'}>
              {getTypeName(field)}
            </Text>
            {field.type.kind === 'LIST' ? ']' : ''}
          </Text>
        </>
      )}
    </Box>
  );
}

let schema: SchemaType;

export default function Schema() {
  const [isSchemaLoaded, setIsSchemaLoaded] = useState(false);
  useEffect(() => {
    async function loadDoc() {
      if (!schema) {
        schema = await getSchema().then((res) => res);
      }
      setIsSchemaLoaded(!!schema);
    }
    loadDoc();
  }, []);
  return (
    <>
      {isSchemaLoaded && (
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={'18px'}>
                  Query: {schema.types[0].name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontSize="sm">
                {schema.types[0].description}
              </Box>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <Text as="h3" mb={'5px'} fontSize={'18px'} color={'gray.400'}>
                Queries
              </Text>
              <SchemaTree typeName={schema.types[0].name} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
      {!isSchemaLoaded && <SkeletonText mt="4" noOfLines={12} spacing="4" skeletonHeight="3" />}
    </>
  );
}

interface DrawTreeProps {
  field?: Field;
  typeName?: string;
}

function SchemaTree({ field, typeName }: DrawTreeProps) {
  const fieldTypeName = typeName ? typeName : field && getTypeName(field);
  const type = schema.types.find((type) => type.name === fieldTypeName);
  if (type && type.fields) {
    return (
      <Accordion allowToggle>
        {type.fields.map((field) => {
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
                    <Text as="span" flex="1" textAlign="left" fontSize="sm" color={'gray.500'}>
                      {field.description}
                    </Text>
                  </h2>
                  <AccordionPanel pb={4} px={0}>
                    <GetTypes field={field} />
                    <Box mt={8}>
                      <Text as="h3" mb={'5px'} fontSize={'18px'} color={'gray.400'}>
                        Type details
                      </Text>
                      {isExpanded && <SchemaTree field={field} />}
                    </Box>
                    {!!field.args.length && (
                      <Box mt={8}>
                        <Text as="h3" mb={'5px'} fontSize={'18px'} color={'gray.400'}>
                          Arguments
                        </Text>
                        <Accordion allowToggle>
                          {field.args.map((arg: Arg) => {
                            const argTypeName: string = getArgTypeName(arg).trim().endsWith('!')
                              ? getArgTypeName(arg).trim().slice(0, -1)
                              : getArgTypeName(arg).trim();
                            const typeForArg = schema.types.find(
                              (argType) => argType.name === argTypeName
                            );
                            return (
                              <AccordionItem key={arg.name}>
                                {({ isExpanded }) => (
                                  <>
                                    <h2>
                                      <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left">
                                          <Text as="span" color={'tomato'}>
                                            {' '}
                                            {arg.name}:{' '}
                                          </Text>
                                          <Text as="span" color={'orange'}>
                                            {getArgTypeName(arg)}
                                          </Text>
                                          {/* {arg.name + ': ' + getArgTypeName(arg)} */}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                      {isExpanded && typeForArg?.kind === 'SCALAR' && (
                                        <Text
                                          as="span"
                                          my={'5px'}
                                          fontSize={'16px'}
                                          color={'gray.500'}
                                        >
                                          {typeForArg?.description}
                                        </Text>
                                      )}
                                      {isExpanded && typeForArg?.kind === 'INPUT_OBJECT' && (
                                        <Accordion allowToggle>
                                          <Text
                                            as="h3"
                                            mb={'5px'}
                                            fontSize={'18px'}
                                            color={'gray.400'}
                                          >
                                            Type details
                                          </Text>
                                          {typeForArg.inputFields?.map((inputField) => {
                                            return (
                                              <AccordionItem key={inputField.name}>
                                                {({ isExpanded }) => (
                                                  <>
                                                    <AccordionButton>
                                                      <Box as="span" flex="1" textAlign="left">
                                                        {/* <Text as="span" color={'tomato'}>
                                                          {' '}
                                                          {inputField.name}:{' '}
                                                        </Text>
                                                        <Text as="span" color={'orange'}>
                                                          {getArgTypeName(inputField)}
                                                        </Text> */}
                                                        {inputField.name +
                                                          ': ' +
                                                          getArgTypeName(inputField)}
                                                      </Box>
                                                      <AccordionIcon />
                                                    </AccordionButton>
                                                    <AccordionPanel>
                                                      {isExpanded && (
                                                        <SchemaTree
                                                          typeName={getArgTypeName(
                                                            inputField
                                                          ).trim()}
                                                        />
                                                      )}
                                                    </AccordionPanel>
                                                  </>
                                                )}
                                              </AccordionItem>
                                            );
                                          })}
                                        </Accordion>
                                      )}
                                    </AccordionPanel>
                                  </>
                                )}
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </Box>
                    )}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  } else if (type?.kind === 'SCALAR') {
    return (
      <Text as="span" my={'5px'} fontSize={'16px'} color={'gray.500'}>
        {type.description}
      </Text>
    );
  } else return <></>;
}
