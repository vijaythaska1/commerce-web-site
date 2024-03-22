import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,

} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import logo from "../assets/sidebarimage.png"

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [sidebar, setsidebar] = useState(0)
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const sidebaropen = () => {
    setsidebar(sidebar === 1 ? 0 : 1)
  };

  return (
    <Card className={`min-h-full 
    ${sidebar === 0
        ? `w-full`
        : `w-20`} 
      max-w-[20rem] p-4 shadow-xl transition ease-in-out delay-150`}
    >
      <div className={`flex ${sidebar ===0 ? "justify-end " : "justify-center mb-3" } relative top-1 `}>
        <span class="material-symbols-outlined transition duration-700"
          onClick={sidebaropen}
        >
          menu
        </span>
      </div>
      <div className="mb-2 flex justify-center">
        <Typography variant="h5" color="blue-gray ">
          <img
            className="object-cover object-center"
            src={logo}
            alt="nature image"
          />
        </Typography>
      </div>

      <List>
        <Accordion
          open={open == 1}
          className={`${sidebar === 0
            ? `w-full`
            : `w-10`}`
          }
          icon={sidebar === 0
            ? <ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform`} />
            : ""}
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>

              <Typography color="blue-gray" className="mr-auto font-normal">
                {`${sidebar === 0 ? "Dashboed" : ""}`}
              </Typography>

            </AccordionHeader>
          </ListItem>


          <AccordionBody className="py-1">
            <List className="p-0">

              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>

              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>

              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>

            </List>
          </AccordionBody>
        </Accordion>



        <Accordion className={`${sidebar === 0 ? `w-full` : `w-10`}`}>
          <ListItem >

            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            {`${sidebar === 0 ? "Inbox" : ""}`}
            <ListItemSuffix>

            </ListItemSuffix>
          </ListItem>

          <ListItem className={`${sidebar === 0 ? "Inbox" : ""}`}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            {`${sidebar === 0 ? "Profile" : ""}`}
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            {`${sidebar === 0 ? "Satting" : ""}`}
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            {`${sidebar === 0 ? "Log Out" : ""}`}
          </ListItem>

        </Accordion>

      </List>

    </Card>
  );
}