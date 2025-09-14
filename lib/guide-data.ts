export interface GuideSection {
  id: string
  title: string
  description: string
  icon: string
  pages: GuidePage[]
}

export interface GuidePage {
  id: string
  slug: string
  title: string
  description: string
  content: string
  readingTime: number
  category: string
}

export interface GuideNavigation {
  current: GuidePage
  previous?: GuidePage
  next?: GuidePage
  section: GuideSection
}

// Transform USER_GUIDES.md content into structured data
export const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Install Berri and learn the basics',
    icon: 'Rocket',
    pages: [
      {
        id: 'installation',
        slug: 'installation',
        title: 'Installation & Setup',
        description: 'How to download, install, and launch Berri for the first time',
        category: 'getting-started',
        readingTime: 3,
        content: `# Installation & Setup

## How to Install Berri

### 1. Download Berri
- Visit the Berri website or GitHub releases page
- Download the latest \`.dmg\` file for macOS
- Double-click the downloaded file to open the installer

### 2. Install the Application
- Drag Berri to your Applications folder
- The app will be automatically code-signed and notarized for security
- Launch Berri from Applications or Spotlight search

### 3. First Launch
- Berri will appear in the bottom-right corner of your screen
- You'll see the welcome screen with setup options
- The app stays "always on top" - it won't disappear behind other windows

Your Berri journey begins here! The installation process is designed to be simple and secure.`
      },
      {
        id: 'first-launch',
        slug: 'first-launch',
        title: 'First Launch Experience',
        description: 'What happens when you start using Berri for the first time',
        category: 'getting-started',
        readingTime: 4,
        content: `# First Launch Experience

## What Happens When You Click "Start Using Berri"

When you first launch Berri and click the "Start Using Berri" button:

### 1. Permission Requests
Berri will ask for necessary system permissions (explained in detail later)

### 2. Initial Setup
The app configures itself for optimal performance

### 3. Interface Transition
You'll move from the welcome screen to the main interface

### 4. Pill Mode
Berri automatically switches to its compact "Pill" mode for unobtrusive access

## Your First Berri Experience

- **Always Visible**: Berri stays on top of all other applications
- **Quick Access**: Use global keyboard shortcuts to interact without clicking
- **Smart Positioning**: The app positions itself intelligently based on your screen setup
- **Instant Availability**: Access your productivity tools without switching applications`
      },
      {
        id: 'interface-overview',
        slug: 'interface-overview',
        title: 'Interface Overview',
        description: 'Understanding Berri\'s three interface modes and basic concepts',
        category: 'getting-started',
        readingTime: 5,
        content: `# Interface Overview

Berri has three distinct interface modes, each designed for different use cases:

## 1. Default View (Welcome Screen)
- **Purpose**: Initial setup and first-time user experience
- **Appearance**: Full welcome interface with setup options
- **When You'll See It**: Only during first launch and setup
- **Size**: Medium-sized window for comfortable setup

## 2. Pill View (Compact Mode)
- **Purpose**: Unobtrusive access when you're focused on other work
- **Appearance**: Small, minimalist floating button/bar
- **When to Use**: When you want Berri available but not distracting
- **Size**: Very small footprint on your screen

### Orientations:
- **Vertical**: Tall, narrow pill (50px wide × 200px tall)
- **Horizontal**: Wide, short pill (200px wide × 50px tall)

## 3. Hover View (Expanded Mode)
- **Purpose**: Full access to all Berri features and tools
- **Appearance**: Complete interface with all modules visible
- **When to Use**: When actively using Berri's productivity features
- **Size**: Customizable, larger window for comfortable interaction
- **Features**: Access to Notes, Clipboard, Files, Webview, Games, and Settings

Each mode is optimized for different workflows and usage patterns.`
      }
    ]
  },
  {
    id: 'interface-navigation',
    title: 'Interface & Navigation',
    description: 'Master Berri\'s movement, positioning, and shortcuts',
    icon: 'Navigation',
    pages: [
      {
        id: 'interface-modes',
        slug: 'interface-modes',
        title: 'Interface Modes',
        description: 'Deep dive into Default, Pill, and Hover views',
        category: 'interface-navigation',
        readingTime: 4,
        content: `# Interface Modes

## Switching Between Modes

### Automatic Transitions
- **Startup**: Berri starts in Default view, then switches to Pill view
- **First Use**: After setup, automatically transitions to Pill mode
- **Activity-Based**: Switches to Hover view when accessing features

### Manual Control
- **Hover Over Pill**: Temporarily expand to see more options
- **Click to Expand**: Click Pill view to switch to Hover view
- **Background Click**: Click outside Hover view to return to Pill
- **Shortcuts**: Use keyboard shortcuts to directly access features

### Smart Behavior
- **Context Awareness**: Berri remembers your preferred mode for different activities
- **Position Memory**: Maintains separate positions for different modes
- **Size Persistence**: Remembers custom sizes for Hover view

The interface modes work together to provide the right level of access at the right time.`
      },
      {
        id: 'positioning',
        slug: 'positioning',
        title: 'Movement & Positioning',
        description: 'How to position Berri perfectly on your screen',
        category: 'interface-navigation',
        readingTime: 3,
        content: `# Movement & Positioning Capabilities

## Free Movement
- **Drag Anywhere**: Click and drag Berri to any position on your screen
- **Multi-Monitor Support**: Works seamlessly across multiple displays
- **Smart Positioning**: Berri remembers your preferred positions
- **Screen Edge Awareness**: Automatically adjusts to stay within screen bounds

## Pill Orientation Options

### Vertical Orientation
- **Best For**: Side placement on wide screens
- **Position**: Usually placed on left or right screen edges
- **Size**: 50px wide × 200px tall
- **Ideal When**: You have horizontal screen space to spare

### Horizontal Orientation (Top Placement)
- **Best For**: Top-of-screen placement
- **Position**: Usually centered at the top of your screen
- **Size**: 200px wide × 50px tall
- **Ideal When**: You want quick access without blocking side content
- **Default Setting**: New users automatically get horizontal orientation

## Always-on-Top Behavior
- **Never Hidden**: Berri stays visible above all applications
- **Work Alongside**: Use other apps normally while Berri remains accessible
- **Incognito Mode Available**: Hide from screen recordings when needed (in Settings)`
      },
      {
        id: 'mode-switching',
        slug: 'mode-switching',
        title: 'Mode Switching',
        description: 'Learn how to efficiently switch between interface modes',
        category: 'interface-navigation',
        readingTime: 2,
        content: `# Mode Switching

## Quick Transitions

### From Pill to Hover
- **Hover**: Simply move your mouse over the Pill
- **Click**: Click anywhere on the Pill to expand
- **Keyboard**: Use any module shortcut (⌃+1-4)

### From Hover Back to Pill
- **Background Click**: Click anywhere outside the Hover interface
- **Auto-Collapse**: Automatically collapses after inactivity (configurable)
- **Escape Key**: Press Escape to quickly return to Pill mode

### Direct Module Access
- Use keyboard shortcuts to jump directly to specific features:
  - **⌃+1**: Files (immediate access)
  - **⌃+2**: Clipboard (bypasses mode switching)
  - **⌃+3**: Webview (direct navigation)
  - **⌃+4**: Notes (opens directly in Hover mode)

## Tips for Efficient Switching
- **Learn the Shortcuts**: Fastest way to access features
- **Use Hover Behavior**: Quick preview without full expansion
- **Customize Auto-Collapse**: Set timing that matches your workflow`
      },
      {
        id: 'shortcuts',
        slug: 'shortcuts',
        title: 'Keyboard Shortcuts',
        description: 'Master all global keyboard shortcuts for maximum efficiency',
        category: 'interface-navigation',
        readingTime: 4,
        content: `# Keyboard Shortcuts

Berri provides powerful global keyboard shortcuts that work from anywhere on your system:

## Primary Controls
| Shortcut | Action | Description |
|----------|--------|-------------|
| \`Control + E\` | Toggle Visibility | Show/hide Berri instantly |
| \`Control + W\` | Screenshot | Take a screenshot with selection tool |

## Module Access Shortcuts
| Shortcut | Module | Description |
|----------|--------|-------------|
| \`Control + 1\` | Files | Open file explorer |
| \`Control + 2\` | Clipboard | Direct access to clipboard history |
| \`Control + 3\` | Webview | Access trusted websites |
| \`Control + 4\` | Notes | Quick access to your notes |

## How Global Shortcuts Work
- **System-Wide**: Work from any application, even when Berri isn't focused
- **Instant Access**: No need to click or find Berri - just use the shortcut
- **Mode-Aware**: Automatically opens the appropriate view mode
- **Efficient Workflow**: Keep working in other apps while accessing Berri features

## Pro Tips
- **Muscle Memory**: Practice shortcuts daily for fastest access
- **Workflow Integration**: Map shortcuts to your common tasks
- **Quick Toggle**: Use ⌃+E during presentations or deep focus work`
      }
    ]
  },
  {
    id: 'permissions-setup',
    title: 'Permissions Setup',
    description: 'Understanding and configuring system permissions',
    icon: 'Shield',
    pages: [
      {
        id: 'permissions-overview',
        slug: 'permissions-overview',
        title: 'Permissions Overview',
        description: 'Why Berri needs system permissions and what each one does',
        category: 'permissions-setup',
        readingTime: 3,
        content: `# Permissions Overview

Berri requests several system permissions to provide its full functionality. Here's what each permission does and why it's needed:

## Why Permissions Are Important
Berri's advanced features require deep system integration to provide:
- Global keyboard shortcuts that work anywhere
- Screenshot capture with advanced tools
- Always-on-top window behavior
- File system integration for productivity features

## Required Permissions Summary

### Screen Recording Permission
**Purpose**: Screenshots and screen capture features

### Accessibility Permission
**Purpose**: Global shortcuts and system integration

### File System Access
**Purpose**: File browsing and management features

## Privacy & Security
- All permissions are used only for their stated purposes
- No data is transmitted outside your device
- You maintain full control over when features are used
- Permissions can be revoked at any time through System Preferences

## Grant During Setup
Berri will guide you through granting necessary permissions during the initial setup process. This ensures all features work correctly from the start.`
      },
      {
        id: 'screen-recording',
        slug: 'screen-recording',
        title: 'Screen Recording Permission',
        description: 'Enable screenshot features and screen capture',
        category: 'permissions-setup',
        readingTime: 2,
        content: `# Screen Recording Permission

## What It Does
Allows Berri to take screenshots and capture screen content

## Why We Need It
- **Screenshot feature** (Control+W shortcut)
- **Screen capture with text recognition** (OCR)
- **Preview screenshots** before saving

## How It's Used
- Only when you actively use screenshot features
- Never runs in the background
- You control when screenshots are taken

## Privacy Protection
- Screenshots are processed locally, never sent anywhere
- No automatic or scheduled captures
- You see exactly what's being captured

## How to Grant
1. **During Setup**: Berri will request this permission automatically
2. **System Preferences**: Go to System Preferences > Security & Privacy > Privacy > Screen Recording
3. **Enable Berri**: Check the box next to Berri in the list
4. **Restart**: You may need to restart Berri after granting

## Troubleshooting
- If screenshots aren't working, verify this permission is enabled
- Look for Berri in the Screen Recording section of Privacy settings
- Try restarting Berri after enabling the permission`
      },
      {
        id: 'accessibility',
        slug: 'accessibility',
        title: 'Accessibility Permission',
        description: 'Enable global shortcuts and system integration',
        category: 'permissions-setup',
        readingTime: 2,
        content: `# Accessibility Permission

## What It Does
Allows Berri to monitor system events and use global shortcuts

## Why We Need It
- **Global keyboard shortcuts** (Control+E, Control+W, etc.)
- **Always-on-top window behavior**
- **System integration features**

## How It's Used
- Enables seamless interaction without switching focus
- Monitors only specific keyboard combinations
- Required for the always-on-top functionality

## Privacy Protection
- Only monitors keyboard shortcuts, not your typing
- No access to passwords or sensitive input
- Focused solely on Berri's specific shortcuts

## How to Grant
1. **During Setup**: Berri will request this permission
2. **System Preferences**: Go to System Preferences > Security & Privacy > Privacy > Accessibility
3. **Add Berri**: Click the + button and select Berri from Applications
4. **Enable**: Check the box next to Berri
5. **Restart**: Restart Berri to activate the permission

## Troubleshooting
- If global shortcuts aren't working, check this permission
- Ensure Berri is listed and enabled in Accessibility settings
- This permission is essential for core Berri functionality`
      },
      {
        id: 'file-access',
        slug: 'file-access',
        title: 'File System Access',
        description: 'Enable file browsing and management features',
        category: 'permissions-setup',
        readingTime: 2,
        content: `# File System Access

## What It Does
Access to Desktop and Downloads folders

## Why We Need It
- **File Explorer feature** to browse and manage files
- **Save screenshots** to your chosen location
- **Import/export notes** and clipboard items

## How It's Used
- Only when you use file-related features
- Limited to folders you interact with
- No background file scanning

## Privacy Protection
- Only accesses files you explicitly interact with
- No automatic file reading or indexing
- You control which files Berri can see

## How to Grant
1. **During Setup**: Berri will guide you through this process
2. **System Preferences**: Go to System Preferences > Security & Privacy > Privacy > Full Disk Access
3. **Add Berri**: Click the + button and select Berri
4. **Enable**: Check the box next to Berri
5. **Restart**: May require restarting Berri

## Scope of Access
- **Desktop**: Browse and manage desktop files
- **Downloads**: Quick access to downloaded files
- **Custom Folders**: Any folders you specifically open
- **Screenshots**: Save location access for screenshot feature

## Troubleshooting
- If file features aren't working, verify this permission
- Check that Berri is enabled in Full Disk Access
- Some file operations may require restarting the app`
      }
    ]
  },
  {
    id: 'feature-modules',
    title: 'Feature Modules',
    description: 'Deep dive into each of Berri\'s productivity modules',
    icon: 'Grid3X3',
    pages: [
      {
        id: 'notes',
        slug: 'notes',
        title: 'Notes Module',
        description: 'Your digital notepad with rich text editing capabilities',
        category: 'feature-modules',
        readingTime: 5,
        content: `# Notes Module
**Your digital notepad with rich text editing capabilities**

## What It Does
- Create and edit notes with rich text formatting
- Organize notes with tags and categories
- Search through all your notes instantly
- Export notes to Word documents

## Key Features

### Rich Text Editor
- **Bold, italic, underline**: Standard formatting options
- **Lists**: Bulleted and numbered lists
- **Headers**: Multiple heading levels for organization
- **Links**: Add clickable links to your notes

### Auto-Tagging
- Berri automatically suggests relevant tags based on content
- Create custom tags for better organization
- Filter notes by tags for quick access

### Categories
- Organize notes into custom categories
- Create unlimited categories for different projects
- Visual indicators for easy category identification

### Full-Text Search
- Find any note by searching its content
- Search across all notes simultaneously
- Instant results as you type

### Note Summaries
- AI-powered summaries of longer notes
- Quick overview without opening full note
- Especially useful for lengthy research notes

### Split View
- See your note list and editor simultaneously
- Drag to resize panes for optimal viewing
- Switch between notes without losing context

## How to Access
- **Shortcut**: \`Control + 4\`
- **Interface**: Click the Notes icon in Hover view
- **Quick Note**: Available from any interface mode

## Pro Tips
- Use consistent tagging for better organization
- Take advantage of the search feature for quick retrieval
- Export important notes as backups`
      },
      {
        id: 'clipboard',
        slug: 'clipboard',
        title: 'Clipboard Module',
        description: 'Never lose copied content with intelligent clipboard history',
        category: 'feature-modules',
        readingTime: 4,
        content: `# Clipboard Module
**Never lose copied content again with intelligent clipboard history**

## What It Does
- Automatically saves everything you copy
- Organize clipboard items with favorites
- Search through your clipboard history
- Support for text, images, and files

## Key Features

### Automatic Tracking
- Every copy operation is saved automatically
- Works with any application on your system
- No manual intervention required

### Multiple Formats
- **Text**: Plain text, rich text, code snippets
- **Images**: Screenshots, copied images, graphics
- **File Paths**: Files copied in Finder
- **URLs**: Web links and addresses

### Smart Search
- Find clipboard items by content or type
- Search across your entire clipboard history
- Filter by date, type, or content

### Favorites System
- Mark important items to keep them accessible
- Favorites never expire from history
- Quick access to frequently used content

### Bulk Operations
- Delete multiple items at once
- Clear old items by date range
- Organize and clean up your history

### History Limits
- Automatically manages storage (keeps 30 days)
- Configurable retention periods
- Smart cleanup of duplicate items

## How to Access
- **Shortcut**: \`Control + 2\`
- **Interface**: Click the Clipboard icon in Hover view
- **Quick Paste**: Available from Pill view for recent items

## Workflow Benefits
- Never lose important copied content
- Quick access to frequently used text
- Perfect for repetitive tasks
- Seamless integration with any application`
      },
      {
        id: 'files',
        slug: 'files',
        title: 'Files Module',
        description: 'Quick file browsing and management',
        category: 'feature-modules',
        readingTime: 3,
        content: `# Files Module
**Quick file browsing and management**

## What It Does
- Browse your Desktop and Downloads folders
- Quick file operations and management
- File information and previews
- Integration with system file operations

## Key Features

### Folder Navigation
- **Desktop**: Quick access to desktop files
- **Downloads**: Browse recent downloads
- **Custom Folders**: Add your own frequently used folders
- **Breadcrumb Navigation**: Easy folder traversal

### File Previews
- See file information and thumbnails
- Quick preview without opening files
- File size, modification date, and type
- Visual icons for different file types

### Quick Actions
- **Open**: Launch files in default applications
- **Reveal in Finder**: Show file location
- **Copy Path**: Copy file path to clipboard
- **Move to Trash**: Delete files safely

### Search
- Find files by name quickly
- Real-time search as you type
- Filter by file type or extension

### Refresh
- Always shows current file state
- Auto-refresh when module is accessed
- Manual refresh option available

## How to Access
- **Shortcut**: \`Control + 1\`
- **Interface**: Click the Files icon in Hover view
- **Auto-Refresh**: Files update when the module is accessed

## Use Cases
- Quick access to recent downloads
- Desktop cleanup and organization
- File management without opening Finder
- Integration with other Berri modules`
      },
      {
        id: 'webview',
        slug: 'webview',
        title: 'Webview Module',
        description: 'Curated web browsing with trusted websites only',
        category: 'feature-modules',
        readingTime: 4,
        content: `# Webview Module
**Curated web browsing with trusted websites only**

## What It Does
- Browse pre-approved, trusted websites
- Maintain login sessions across visits
- Safe browsing without full browser risks
- History and navigation controls

## Key Features

### Trusted Sites Only
- Only visit websites you've pre-approved
- Add new sites through Settings
- Protection against malicious sites
- Curated, safe browsing experience

### Session Persistence
- Stay logged into websites between uses
- No need to re-authenticate frequently
- Secure session storage
- Automatic session management

### Google Services Integration
- Seamless access to Gmail, Drive, Calendar
- Built-in support for Google Workspace
- Single sign-on functionality
- Optimized for productivity services

### Built-in Security
- Protection against malicious sites
- Secure browsing environment
- No risk of accidental harmful site visits
- Controlled web environment

### Browse History
- Track your visited sites
- Quick return to recent pages
- History search and filtering
- Session restoration

### Tab-like Experience
- Switch between different websites
- Multiple sites open simultaneously
- Clean, organized interface
- Quick site switching

## Important Notes
- **Not a Full Browser**: Designed for specific, trusted websites only
- **Security Focus**: Prevents accidental visits to harmful sites
- **Curated Experience**: Add new sites through Settings

## How to Access
- **Shortcut**: \`Control + 3\`
- **Interface**: Click the Browse icon in Hover view

## Best Practices
- Add only trusted, frequently used sites
- Keep login sessions secure
- Use for productivity and work-related browsing
- Regularly review and update trusted sites list`
      },
      {
        id: 'games',
        slug: 'games',
        title: 'Games Module',
        description: 'Quick entertainment and brain breaks',
        category: 'feature-modules',
        readingTime: 2,
        content: `# Games Module
**Quick entertainment and brain breaks**

## What It Does
- Simple games for short breaks
- Brain training and puzzle games
- Quick entertainment without leaving Berri

## Key Features

### Quick Games
- Short, casual games perfect for breaks
- 2-5 minute gaming sessions
- Easy to start and stop
- No complex setup or learning curve

### No Installation
- Games built into Berri
- No additional downloads required
- Instant access when needed
- Lightweight and efficient

### Productivity Balance
- Take breaks without losing focus
- Mental refreshment between tasks
- Stress relief during busy periods
- Maintain workflow momentum

## Game Types
- **Puzzle Games**: Logic and problem-solving
- **Memory Games**: Brain training exercises
- **Quick Challenges**: Fast-paced mini-games
- **Relaxation Games**: Calm, meditative gameplay

## How to Access
- **Interface**: Click the Games icon in Hover view
- **No Shortcut**: Accessed through interface only

## Philosophy
Games in Berri are designed as productivity tools:
- Short, focused breaks improve concentration
- Mental refreshment prevents burnout
- Quick access prevents extended gaming sessions
- Integrates seamlessly with work routine

## Best Practices
- Use during natural break points
- Keep sessions short (2-5 minutes)
- Return to work refreshed and focused
- Don't let games become a distraction`
      },
      {
        id: 'settings',
        slug: 'settings',
        title: 'Settings Module',
        description: 'Customize Berri to work exactly how you want',
        category: 'feature-modules',
        readingTime: 4,
        content: `# Settings Module
**Customize Berri to work exactly how you want**

## What It Does
- Customize Berri's appearance and behavior
- Manage permissions and privacy settings
- Add trusted websites for Webview
- Configure shortcuts and preferences

## Key Features

### Appearance
- **Colors**: Customize theme colors and accents
- **Transparency**: Adjust window opacity levels
- **Positioning**: Set default positions for different modes
- **Size**: Configure default window sizes

### Behavior
- **Auto-start**: Launch Berri when system starts
- **Shortcuts**: Customize global keyboard shortcuts
- **Notifications**: Control when and how Berri notifies you
- **Auto-collapse**: Set timing for automatic mode switching

### Privacy
- **Incognito Mode**: Hide from screen recordings and screenshots
- **Data Management**: Control what data is stored locally
- **Permission Status**: View and manage system permissions
- **History Limits**: Set retention periods for different modules

### Trusted Sites
- **Add Websites**: Configure sites for Webview module
- **Site Management**: Edit, remove, or organize trusted sites
- **Security Settings**: Configure site-specific security options
- **Import/Export**: Backup and restore site lists

### Updates
- **Automatic Updates**: Control update preferences
- **Notification Settings**: Choose how to be notified of updates
- **Beta Features**: Opt into experimental features
- **Version Information**: View current version and changelog

## How to Access
- **Interface**: Click the Settings icon in Hover view
- **Gear Icon**: Available in all interface modes

## Configuration Categories

### Display Settings
- Theme selection (light, dark, auto)
- Color customization
- Font size and family
- Animation preferences

### Workflow Settings
- Shortcut customization
- Default module behavior
- Auto-save preferences
- Integration settings

### Security Settings
- Permission management
- Privacy controls
- Data encryption options
- Backup and restore

## Pro Tips
- Explore all settings for optimal experience
- Backup settings before major changes
- Use incognito mode for presentations
- Customize shortcuts to match your workflow`
      }
    ]
  },
  {
    id: 'advanced-usage',
    title: 'Advanced Usage',
    description: 'Tips, tricks, and troubleshooting',
    icon: 'Settings',
    pages: [
      {
        id: 'tips',
        slug: 'tips',
        title: 'Tips for Best Experience',
        description: 'Optimize your Berri workflow with these expert tips',
        category: 'advanced-usage',
        readingTime: 4,
        content: `# Tips for Best Experience

## Positioning Tips

### Corner Placement
- **Bottom-right corner** works well for most users
- Stays out of the way of main work areas
- Easy to access without disrupting workflow

### Top Horizontal
- Try **horizontal pill at screen top** for quick access
- Great for users who frequently switch between applications
- Minimizes mouse movement for activation

### Multi-Monitor
- Place on **secondary monitor** for reference while working
- Keep main monitor clear for primary tasks
- Use as a persistent reference panel

## Workflow Integration

### Use Shortcuts
- **Master the global shortcuts** for fastest access
- Practice until they become muscle memory
- Shortcuts are faster than mouse interaction

### Module Switching
- Use **Control+1-4** to jump directly to needed features
- Skip the interface navigation entirely
- Direct access maintains flow state

### Quick Toggle
- **Control+E** to hide/show when presenting or focusing
- Perfect for screen sharing scenarios
- Instant access when needed, invisible when not

## Customization Recommendations

### Start Small
- Begin with **Pill view**, expand as needed
- Don't overwhelm yourself with all features at once
- Gradually incorporate more modules into your workflow

### Personalize
- **Adjust position and size** to match your workflow
- Experiment with different orientations
- Find what works best for your specific setup

### Privacy Mode
- Enable **incognito mode** for screen sharing/recording
- Prevents Berri from appearing in screenshots
- Professional appearance during presentations

## Advanced Workflow Patterns

### The Quick Capture Pattern
1. Use Control+W for instant screenshots
2. Control+4 for quick notes
3. Control+2 to access clipboard history
4. Build muscle memory for rapid information capture

### The Reference Monitor Setup
- Place Berri on secondary monitor
- Keep notes, clipboard, or files visible
- Use as persistent reference while working on main display

### The Presentation Mode
- Control+E to hide before presenting
- Enable incognito mode in settings
- Control+E to restore after presentation

## Productivity Maximization

### Integration with Other Apps
- Use clipboard history to move data between applications
- Screenshot feature for visual documentation
- Notes for quick thoughts and reminders

### Time Management
- Use games module for structured breaks
- Set reminders in notes for important tasks
- Use file access for quick document retrieval

### Organization Systems
- Develop consistent tagging in notes
- Organize trusted sites by category
- Keep clipboard favorites for frequently used content`
      },
      {
        id: 'troubleshooting',
        slug: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common issues and their solutions',
        category: 'advanced-usage',
        readingTime: 5,
        content: `# Troubleshooting

## Common Issues

### Shortcuts Not Working
**Problem**: Global keyboard shortcuts (Control+E, Control+1-4) don't respond

**Solutions**:
- Check **Accessibility permissions** in System Preferences
- Go to System Preferences > Security & Privacy > Privacy > Accessibility
- Ensure Berri is listed and enabled
- Restart Berri after granting permissions

### Screenshots Failing
**Problem**: Control+W doesn't take screenshots or screenshots appear blank

**Solutions**:
- Verify **Screen Recording permission** is granted
- System Preferences > Security & Privacy > Privacy > Screen Recording
- Check that Berri is enabled in the list
- Try taking a test screenshot after enabling

### Files Not Loading
**Problem**: File module shows empty or can't access Desktop/Downloads

**Solutions**:
- Ensure **Full Disk Access permission** is enabled
- System Preferences > Security & Privacy > Privacy > Full Disk Access
- Add Berri to the list if not present
- Grant permission and restart Berri

### Always-on-Top Not Working
**Problem**: Berri disappears behind other applications

**Solutions**:
- **Restart Berri** after granting all permissions
- Check that Accessibility permission is properly granted
- Try toggling Berri visibility with Control+E
- Ensure no other applications are forcing themselves on top

### Interface Not Responding
**Problem**: Berri appears frozen or unresponsive

**Solutions**:
- **Force quit** Berri (Command+Option+Escape)
- Restart the application
- Check Activity Monitor for any Berri processes
- Restart your Mac if issues persist

### Poor Performance
**Problem**: Berri runs slowly or impacts system performance

**Solutions**:
- **Clear clipboard history** if it's very large
- Reduce auto-save frequency in settings
- Close unused browser tabs in Webview module
- Check available system memory

## Permission Issues

### Permission Denied Errors
1. **Open System Preferences**
2. Go to **Security & Privacy > Privacy**
3. Check all relevant sections:
   - Screen Recording
   - Accessibility
   - Full Disk Access
4. **Remove and re-add Berri** if listed but not working
5. **Restart Berri** after any permission changes

### Permissions Reset After Update
- macOS sometimes resets permissions after system updates
- Re-grant all permissions following the setup guide
- This is normal behavior after major macOS updates

## Getting Help

### Settings Panel
- Check **Settings > Help** for common solutions
- Built-in diagnostics can identify permission issues
- Links to documentation and support resources

### Permission Reset
- **Re-grant permissions** if features stop working
- Use the guided permission setup in Settings
- Don't skip any permission requests

### Application Restart
- Many permission issues resolve with a **Berri restart**
- Use Command+Q to quit properly, then relaunch
- Force quit only if normal quit doesn't work

## Advanced Troubleshooting

### Clean Reinstall
If all else fails:
1. **Export your data** (notes, settings, trusted sites)
2. Completely uninstall Berri
3. Remove from all permission lists in System Preferences
4. Download fresh copy and reinstall
5. Import your data back

### System Compatibility
- Ensure you're running a **supported macOS version**
- Check for macOS updates that might resolve compatibility issues
- Some features may not work on older macOS versions

### Network Issues
- Webview module requires internet connection
- Check firewall settings if web browsing fails
- Ensure trusted sites are accessible from your network

## Prevention Tips
- **Keep Berri updated** for latest bug fixes
- **Don't revoke permissions** unnecessarily
- **Regular restarts** help maintain performance
- **Backup settings** before making major changes

Remember: Most issues are permission-related and can be resolved by properly granting system permissions and restarting Berri.`
      }
    ]
  }
]

// Helper functions for navigation
export function getAllPages(): GuidePage[] {
  return guideSections.flatMap(section => section.pages)
}

export function getPageBySlug(category: string, slug: string): GuidePage | undefined {
  return getAllPages().find(page => page.category === category && page.slug === slug)
}

export function getNavigationForPage(category: string, slug: string): GuideNavigation | null {
  const allPages = getAllPages()
  const currentIndex = allPages.findIndex(page => page.category === category && page.slug === slug)

  if (currentIndex === -1) return null

  const current = allPages[currentIndex]
  const section = guideSections.find(s => s.id === category)!

  return {
    current,
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : undefined,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined,
    section
  }
}

export function getSectionByCategory(category: string): GuideSection | undefined {
  return guideSections.find(section => section.id === category)
}

export function getTotalPages(): number {
  return getAllPages().length
}

export function getPageIndex(category: string, slug: string): number {
  const allPages = getAllPages()
  return allPages.findIndex(page => page.category === category && page.slug === slug)
}