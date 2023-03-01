import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

const filters = [
  {
    id: 'category',
    name: 'Categories',
    options: [
      { value: '1', label: 'Blue Stress Level', checked: false },
      { value: '2', label: 'Green Stress Level', checked: false },
      { value: '3', label: 'Yellow Stress Level', checked: false },
      { value: '4', label: 'Orange Stress Level', checked: false },
      { value: '5', label: 'Red Stress Level', checked: false },
    ],
  },
];

function Category(props) {
  const [checkedState, setCheckedState] = useState(
    new Array(filters[0].options.length).fill(false)
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [graph, setGraph] = useState(props.currentGraph);

  const handleChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        return !item;
      } else {
        return item;
      }
    });

    setCheckedState(updatedCheckedState);
  };

  const filterGraph = () => {
    graph.forEachNode((node, attributes) => {
      console.log('here', node, attributes);
    });
    for (const { edge, attributes } of graph.edgeEntries()) {
      console.log('edgekey', edge, attributes.stressCode);
    }

    setCheckedFilter();
    checkedState.forEach((val, index) => {
      if (filters[0].options[index].checked === true) {
        console.log(
          'Value',
          filters[0].options[index].value,
          'Color',
          filters[0].options[index].label
        );
      }
    });
    let nodesArr = graph.filterNodes((node, attributes) => {
      if (node !== '5c410bec-ec14-403c-8fb5-748362911c0b') {
        return node;
      }
    });

    let edges = graph.filterInEdges((edge, attribute, sources, target) => {
      if (edge !== 'e0d9a226-73b5-4395-a9f3-b60abf00a48c') {
        console.log('attrubute', attribute, 'source', sources, 'target', target);
        //drop target node
        graph.dropNode(sources);
        return edge;
      }
    });

    console.log('edge', edges);
  };

  const setCheckedFilter = () => {
    checkedState.forEach((val, index) => {
      filters[0].options[index].checked = val;
    });
  };

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <Dialog.Panel className="relative ml-auto flex h-full w-60 max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={checkedState[optionIdx]}
                                    onChange={() => {
                                      handleChange(optionIdx);
                                    }}
                                    //defaultChecked={option.checked}
                                    // onClick={props.catFilter}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {option.label}
                                  </label>
                                </div>
                              ))}

                              {
                                //sets the filters.options checked to true when checked or false when uncheked
                                filterGraph()
                              }
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="max-w-1xl mx-auto px-1 sm:px-1 lg:px-1">
        <div className="border-gray-5 flex items-baseline justify-between border-b pt-1 pb-1">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800 sm:ml-1 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}>
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Category;
