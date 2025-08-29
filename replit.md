# OVRA – 물빛&먹 번짐 커뮤니티

## Overview

OVRA is a Korean-language community platform featuring an ink-wash aesthetic design. The application provides a forum-like interface where users can share posts, engage in discussions, and interact through a tag-based content discovery system. The platform emphasizes visual aesthetics with a dark, aquatic color scheme and floating animations that evoke the feeling of ink dispersing in water.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with React 18 using UMD builds delivered via CDN
- **Client-Side Rendering**: No server-side framework, purely browser-based application
- **State Management**: Local component state with localStorage for data persistence
- **Styling Framework**: Tailwind CSS via CDN with custom CSS variables for theming
- **Build System**: Babel Standalone for JSX transformation in the browser

### Data Storage
- **Local Storage**: All user data, posts, and application state stored in browser localStorage
- **No Backend Database**: Fully client-side data persistence model
- **JSON Serialization**: Data stored as JSON strings with error handling for corrupted data

### Content Management System
- **Korean Text Processing**: Custom keyword mapping and stop word filtering for Korean language
- **Tag-Based Organization**: Automated content categorization using predefined keyword mappings
- **User-Generated Content**: Posts with titles, content, tags, and engagement metrics

### User Experience Design
- **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities
- **Dark Theme**: Custom color palette emphasizing blues and cyans for aquatic aesthetic
- **Smooth Animations**: CSS keyframe animations for floating effects and smooth transitions
- **Korean Language Support**: Full Korean language interface with culturally relevant random username generation

### Authentication Model
- **Anonymous Users**: No traditional authentication system
- **Random Nicknames**: Auto-generated Korean nicknames for user identification
- **Session-Based Identity**: User identity tied to browser session via localStorage

## External Dependencies

### CDN Dependencies
- **React 18**: Core framework delivered via unpkg CDN
- **ReactDOM 18**: DOM rendering library via unpkg CDN
- **Babel Standalone**: Client-side JSX transformation
- **Tailwind CSS**: Utility-first CSS framework via CDN

### No External Services
- No database connections
- No API integrations
- No authentication providers
- No content delivery networks for assets
- Self-contained application requiring only a web browser

### Browser APIs
- **localStorage API**: Primary data persistence mechanism
- **DOM APIs**: Standard web APIs for user interface interactions
- **CSS Custom Properties**: For dynamic theming support