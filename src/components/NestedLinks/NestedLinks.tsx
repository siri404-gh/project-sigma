import React, { useState, FC, Fragment } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link as MuiLink,
  Divider,
} from '@mui/material'
import Link from 'next/link'

import { iconMap } from '@/components/Bottombar/Bottombar'
import {
  BottombarProps,
  BottombarLinkType,
} from '@/components/Bottombar/Bottombar'

type NestedLinksProps = BottombarProps & {
  onSelect?: () => void
}

const NestedLinks: FC<NestedLinksProps> = ({ links = [], onSelect }) => (
  <div>
    {links.map(link => (
      <NestedList key={link.title} item={link} onSelect={onSelect} />
    ))}
  </div>
)

type NestedListProps = {
  item: BottombarLinkType
  onSelect?: () => void
}

const NestedList: FC<NestedListProps> = ({ item, onSelect }) => {
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(!open)
  const Icon = iconMap[item.title] || null
  const onNestedItemSelect = () => onSelect?.()

  return (
    <Box sx={{ width: { xs: 285, sm: 300, md: 400 } }}>
      <ListItem onClick={onClick} button>
        <ListItemIcon>
          <Icon color='secondary' />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {item.links?.map(link => (
            <Fragment key={link.title}>
              <Link href={link.url} passHref>
                <MuiLink underline='none'>
                  <ListItem onClick={onNestedItemSelect}>
                    <ListItemText secondary={link.title} />
                  </ListItem>
                </MuiLink>
              </Link>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

export default NestedLinks
