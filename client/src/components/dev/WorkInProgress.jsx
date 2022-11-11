import React, { useState } from 'react';

import { Tooltip, ClickAwayListener } from '@mui/material';

const WorkInProgress = ({ message, placement, sx, children }) => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = (e) => {
        setCoords({ x: e.clientX, y: e.clientY });
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                title={message || 'Work in progress...'}
                placement={placement}
                arrow
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                onClick={handleTooltipOpen}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                sx={{ ...sx, left: coords.x, top: coords.y, position: 'fixed' }}
            >
                {children}
            </Tooltip>
        </ClickAwayListener>
    );
};

export default WorkInProgress;
