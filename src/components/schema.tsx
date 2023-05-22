import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

import { schema } from '../helpers/variables';

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

function getTypes(field: Field): string {
  return `${field.name}${field.args.length ? '(' : ''}${field.args.map(
    (arg) => ' ' + arg.name + ': ' + getArgTypeName(arg)
  )}${field.args.length ? '): ' : ': '}${field.type.kind === 'LIST' ? '[' : ''}${getTypeName(
    field
  )}${field.type.kind === 'LIST' ? ']' : ''}`;
}

export default function Schema() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <Text as="h2">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Query: {schema.types[0].name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontSize="sm" pos={'relative'}>
            {schema.types[0].description}
          </Box>
        </Text>
        <AccordionPanel pb={4} px={0} pos={'relative'}>
          <SchemaTree typeName={schema.types[0].name} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

interface DrawTreeProps {
  field?: Field;
  typeName?: string;
  padding?: string;
  margin?: string;
  background?: string;
}

function SchemaTree({ field, typeName, padding, margin, background }: DrawTreeProps) {
  const fieldTypeName = typeName ? typeName : field && getTypeName(field);
  const type = schema.types.find((type) => type.name === fieldTypeName);

  if (type && type.fields) {
    return (
      <Accordion allowToggle className="accordion-tree">
        {type.fields.map((field) => {
          return (
            <AccordionItem
              key={field.name}
              className="accordion-leaf"
              border={'solid 1px'}
              borderColor={'gray.200'}
              py={'5px'}
              my={'5px'}
              pl={padding || '2px'}
              ml={margin || '1px'}
              pr={'0'}
              mr={'0'}
              borderRight={'0px'}
              bgColor={background || 'white'}
              borderBottomRightRadius="0.5rem"
              borderBottomLeftRadius="0"
              borderTopLeftRadius="1rem"
              borderTopRightRadius="0"
              textAlign="justify"
              pos={'relative'}
            >
              {({ isExpanded }) => (
                <>
                  <Text as="h2">
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="justify"
                        fontSize={'18px'}
                        className="expanded-leaf"
                      >
                        {field.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <Box as="span" flex="1" textAlign="justify" fontSize="sm">
                      {field.description}
                    </Box>
                  </Text>
                  <AccordionPanel px={0} className="inner-expanded-leaf">
                    {getTypes(field) === 'characters: Character' ? (
                      <>
                        {'*' + getTypes(field)}
                        <Box mt={4}>
                          <Text as="h3" mb={'5px'} fontSize={'18px'}>
                            Type details
                          </Text>
                          {isExpanded && (
                            <SchemaTree
                              field={field}
                              margin="0"
                              padding="2px"
                              background={'ghostwhite'}
                            />
                          )}
                        </Box>
                      </>
                    ) : (
                      <>
                        {getTypes(field)}
                        <Box mt={4}>
                          <Text as="h3" mb={'5px'} fontSize={'18px'}>
                            Type details
                          </Text>
                          {isExpanded && <SchemaTree field={field} margin="0" padding="2px" />}
                        </Box>
                      </>
                    )}
                    {!!field.args.length && (
                      <Box mt={4}>
                        <Text as="h3">Arguments</Text>
                        <Accordion allowToggle>
                          {field.args.map((arg) => {
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
                                        <Box
                                          as="span"
                                          flex="1"
                                          textAlign="justify"
                                          className="inner-leaf"
                                        >
                                          {arg.name + ': ' + getArgTypeName(arg)}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </Text>
                                    <AccordionPanel pb={4}>
                                      {isExpanded && typeForArg?.kind === 'SCALAR' && (
                                        <Box as="span" flex="1" textAlign="justify">
                                          {typeForArg?.description}
                                        </Box>
                                      )}
                                      {isExpanded && typeForArg?.kind === 'INPUT_OBJECT' && (
                                        <Accordion allowToggle>
                                          <Text as="h3">Type details</Text>
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
    return <div>{type.description}</div>;
  } else return <></>;
}
