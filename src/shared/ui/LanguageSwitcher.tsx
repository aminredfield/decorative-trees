import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
];
const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        handleClose();
    };

    const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                    ml: 1,
                    bgcolor: open ? 'action.selected' : 'transparent',
                    '&:hover': {
                        bgcolor: 'action.hover',
                    },
                }}
                aria-label="change language"
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <span style={{ fontSize: '1.25rem' }}>{currentLang.flag}</span>
                    <LanguageIcon sx={{ fontSize: '1.25rem' }} />
                </Box>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1,
                        minWidth: 180,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        selected={i18n.language === lang.code}
                        sx={{
                            py: 1.5,
                        }}
                    >
                        <ListItemIcon>
                            <span style={{ fontSize: '1.5rem' }}>{lang.flag}</span>
                        </ListItemIcon>
                        <ListItemText>{lang.name}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;