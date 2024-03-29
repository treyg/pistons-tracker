import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SunIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigation = [
    { name: "Home", href: "/", current: null },
    { name: "NBA Today", href: "/nba", current: null },
    { name: "Stats", href: "/stats", current: null },
    // { name: "Podcasts", href: "/podcasts", current: null },
  ];

  const location = useLocation();

  navigation.forEach((item) => {
    if (item.href === location.pathname) {
      item.current = true;
    }
  });

  //Darkmode setup
  const [darkMode, setDarkMode] = useState(false);

  const checkForDarkMode = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      localStorage.getItem("darkMode") === "true"
    ) {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  };

  const toggleDarkMode = () => {
    //toggle dark mode and save to local storage
    if (darkMode) {
      setDarkMode(false);
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      setDarkMode(true);
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  useEffect(() => {
    checkForDarkMode();
  }, []);

  return (
    <Disclosure as="nav" className="bg-primary-dark">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-red hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="../../classic-stons.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="../../classic-stons.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-900 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="z-10 rounded-md  px-3 py-2 text-sm font-medium text-gray-200"
                onClick={toggleDarkMode}
                id="darkModeBtn"
              >
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
