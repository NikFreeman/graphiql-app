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

const TYPE_NAME_COLOR = 'tomato';
const ARG_NAME_COLOR = 'darkblue';
const ARG_TYPE_NAME_COLOR = 'orange';
const BRACKETS_COLOR = 'black';
const H3_COLOR = 'gray.400';
const DESCRIPTION_COLOR = 'gray.500';

function GetTypes({ field }: DrawTreeProps) {
  return (
    <Box>
      {field && (
        <>
          <Text as="span" color={TYPE_NAME_COLOR}>
            {field.name}
          </Text>
          <Text as="span" color={BRACKETS_COLOR}>
            {field.args.length ? '(' : ''}
            {field.args.map((arg) => {
              return (
                <>
                  <Text as="span" color={ARG_NAME_COLOR}>
                    {' '}
                    {arg.name}:{' '}
                  </Text>
                  <Text as="span" color={ARG_TYPE_NAME_COLOR}>
                    {getArgTypeName(arg)}
                  </Text>
                </>
              );
            })}
            {field.args.length ? '): ' : ': '}
          </Text>
          <Text as="span" color={BRACKETS_COLOR}>
            {field.type.kind === 'LIST' ? '[' : ''}
            <Text as="span" color={ARG_TYPE_NAME_COLOR}>
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
              <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
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
                    <Text
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontSize="sm"
                      color={DESCRIPTION_COLOR}
                    >
                      {field.description}
                    </Text>
                  </h2>
                  <AccordionPanel pb={4} px={0}>
                    <GetTypes field={field} />
                    <Box mt={8}>
                      <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
                        Type details
                      </Text>
                      {isExpanded && <SchemaTree field={field} />}
                    </Box>
                    {!!field.args.length && (
                      <Box mt={8}>
                        <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
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
                                          <Text as="span" color={TYPE_NAME_COLOR}>
                                            {' '}
                                            {arg.name}:{' '}
                                          </Text>
                                          <Text as="span" color={ARG_TYPE_NAME_COLOR}>
                                            {getArgTypeName(arg)}
                                          </Text>
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
                                          color={DESCRIPTION_COLOR}
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
                                            color={H3_COLOR}
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
      <Text as="span" my={'5px'} fontSize={'16px'} color={DESCRIPTION_COLOR}>
        {type.description}
      </Text>
    );
  } else return <></>;
}
