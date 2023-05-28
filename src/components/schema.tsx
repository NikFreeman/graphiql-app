import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  SkeletonText,
  Text,
  useToast,
} from '@chakra-ui/react';

import { getSchema } from '../helpers/variables';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
const H3_COLOR = 'gray.800';
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
                <Text as="span" key={arg.name}>
                  <Text as="span" color={ARG_NAME_COLOR}>
                    {' '}
                    {arg.name}:{' '}
                  </Text>
                  <Text as="span" color={ARG_TYPE_NAME_COLOR}>
                    {getArgTypeName(arg)}
                  </Text>
                </Text>
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
  const toast = useToast();
  useEffect(() => {
    async function loadDoc() {
      if (!schema) {
        const tryGetSchema = await getSchema().then((res) => res);
        if (tryGetSchema && !(tryGetSchema instanceof Error)) {
          schema = tryGetSchema.data.__schema;
        } else if (tryGetSchema) {
          toast({
            title: tryGetSchema.name,
            description: tryGetSchema.message,
            position: 'top-right',
            status: 'error',
            isClosable: true,
            duration: 5000,
          });
        }
      }
      setIsSchemaLoaded(!!schema);
    }
    loadDoc();
  }, [toast]);
  const { t } = useTranslation();
  return (
    <>
      {isSchemaLoaded && (
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={'18px'}>
                  {t('query')}: {schema.types[0].name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <Box as="span" flex="1" textAlign="justify" fontSize="sm">
                {schema.types[0].description}
              </Box>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
                {t('queries')}
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
  const { t } = useTranslation();
  if (type && type.fields) {
    return (
      <Accordion allowToggle>
        {type.fields.map((field) => {
          return (
            <AccordionItem
              key={field.name}
              border={'solid 1px'}
              borderColor={'gray.200'}
              py={'5px'}
              my={'5px'}
              pl={'2px'}
              ml={'1px'}
              pr={'0'}
              mr={'0'}
              borderRight={'0px'}
              borderBottomRightRadius="0.5rem"
              borderBottomLeftRadius="0"
              borderTopLeftRadius="1rem"
              borderTopRightRadius="0"
              textAlign="justify"
            >
              {({ isExpanded }) => (
                <>
                  <Text as="h2">
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="justify">
                        <Text fontWeight={550}> {field.name}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <Text
                      as="span"
                      flex="1"
                      textAlign="justify"
                      fontSize="sm"
                      fontWeight={'400'}
                      color={DESCRIPTION_COLOR}
                    >
                      {field.description}
                    </Text>
                  </Text>
                  <AccordionPanel pb={4} px={0}>
                    <GetTypes field={field} />
                    <Box mt={8}>
                      <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
                        {t('details')}
                      </Text>
                      {isExpanded && <SchemaTree field={field} />}
                    </Box>
                    {!!field.args.length && (
                      <Box mt={8}>
                        <Text as="h3" mb={'5px'} fontSize={'18px'} color={H3_COLOR}>
                          {t('arguments')}
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
                                    <Text as="h2">
                                      <AccordionButton>
                                        <Box as="span" flex="1" textAlign="justify">
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
                                    </Text>
                                    <AccordionPanel pb={4} px={0}>
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
                                            {t('details')}
                                          </Text>
                                          {typeForArg.inputFields?.map((inputField) => {
                                            return (
                                              <AccordionItem key={inputField.name}>
                                                {({ isExpanded }) => (
                                                  <>
                                                    <AccordionButton>
                                                      <Box as="span" flex="1" textAlign="justify">
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
