import React, { useState, FC, Fragment } from 'react'

import {
  CloudQueue,
  Create,
  MenuBook,
  Person,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link as MuiLink,
} from '@mui/material'
import { SvgIconProps } from '@mui/material'

import { NavlinksProps, NavlinkType } from '@/components/Navlinks/Navlinks'

type NestedLinksProps = NavlinksProps & {
  onSelect: () => void
}

const NestedLinks: FC<NestedLinksProps> = ({ links = [], onSelect }) => (
  <div>
    {links.map(link => (
      <NestedList key={link.title} item={link} onSelect={onSelect} />
    ))}
  </div>
)

const iconMap: { [key: string]: (props: SvgIconProps) => JSX.Element } = {
  About: Person,
  Blog: Create,
  Tech: CloudQueue,
  Courses: MenuBook,
}

type NestedListProps = {
  item: NavlinkType
  onSelect: () => void
}

const NestedList: FC<NestedListProps> = ({ item, onSelect }) => {
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(!open)
  const Icon = iconMap[item.title] || null

  return (
    <Fragment>
      <ListItem onClick={onClick} button>
        <ListItemIcon>
          <Icon color='secondary' />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {item.links?.map(link => (
            <MuiLink key={link.title} href={link.url} underline='hover'>
              <ListItem onClick={onSelect}>
                <ListItemText secondary={link.title} />
              </ListItem>
            </MuiLink>
          ))}
        </List>
      </Collapse>
    </Fragment>
  )
}

export default NestedLinks
