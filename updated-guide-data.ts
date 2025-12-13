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

// Guide version metadata
export const GUIDE_METADATA = {
  version: '2.0.0',
  lastUpdated: '2025-12-01',
  appVersion: 'Berri v1.0.7'
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
        id: 'what-is-powerstrip',
        slug: 'what-is-powerstrip',
        title: 'What is the PowerStrip?',
        description: 'Understanding the core concept behind Berri',
        category: 'getting-started',
        readingTime: 2,
        content: `# What is the PowerStrip?

## Your Always-Available Command Center

The **PowerStrip** is Berri's floating toolbar - the heart of the entire application. It's a small, customizable bar that stays visible above all your other apps, giving you instant access to your favorite features and websites.

## Think of It Like...

- **macOS Dock**: But always visible and customizable per app
- **Browser Bookmarks Bar**: But works across your entire system
- **Windows Taskbar**: But smaller, floating, and fully under your control

## Key Characteristics

### Always On Top
The PowerStrip never hides behind other windows. Whether you're working in a browser, writing code, or editing videos - your PowerStrip is always just one click away.

### Fully Customizable
You decide:
- **What appears**: Choose from features (Notes, Clipboard, Web View) and your favorite websites
- **Where it sits**: Position it anywhere on your screen
- **How it looks**: Vertical or horizontal orientation
- **Keyboard shortcuts**: Control+1, Control+2, etc. for instant access

### Smart & Minimal
The PowerStrip starts small (a compact floating button) and expands when you need it. It's designed to stay out of your way while remaining instantly accessible.

## What Can the PowerStrip Do?

### Built-in Features
- **Notes**: Quick note-taking without opening another app
- **Clipboard History**: Access your clipboard history instantly
- **Web View**: Browse websites in a floating window
- **Settings**: Customize Berri to your preferences

### Your Favorite Websites
Add any website to your PowerStrip and access it with a single click or keyboard shortcut. Think:
- YouTube for quick video breaks
- Gmail for checking email
- GitHub for code reviews
- Twitter for social updates
- ChatGPT for AI assistance

## The Big Picture

Traditional productivity tools force you to switch windows constantly. The PowerStrip eliminates that friction - your most-used tools and websites are always one click away, without interrupting your focus.

**Next Step**: Let's get Berri installed on your system.`
      },
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
- Visit the Berri website and click the Download for macOS button
- Download the latest version for macOS
- Double-click the downloaded file to open the installer

### 2. Install the Application
- Drag Berri to your Applications folder
- Launch Berri from Applications or Spotlight search

### 3. First Launch
- Berri will launch and show the welcome screen
- The app stays "always on top" - it won't disappear behind other windows
- Click "Start Using Berri" to begin onboarding

**What is the PowerStrip?**
The PowerStrip is Berri's floating toolbar that gives you quick access to your favorite features and websites. Think of it as a customizable command center that stays visible above all your apps - always there when you need it, small enough to stay out of your way.

Your Berri journey begins here! The installation process is simple and secure.`
      },
      {
        id: 'onboarding',
        slug: 'onboarding',
        title: 'Onboarding Flow',
        description: 'Customize Berri during your first setup',
        category: 'getting-started',
        readingTime: 5,
        content: `# Onboarding Flow

When you first launch Berri, you'll go through a quick customization process to make Berri work exactly how you want.

## Screen 1: Welcome
- Brief introduction to Berri
- Click "Start Using Berri" to begin

## Screen 2: Customize Your PowerStrip

The PowerStrip is your floating toolbar that stays visible above all your apps. This screen lets you choose which features and websites appear in it.

### What You Can Select

**Features (Modules):**
- Notes - Rich text editor for quick thoughts
- Clipboard - History of everything you copy
- Files - Browse Desktop and Downloads
- Browse - Web browsing with trusted sites
- Settings - Always included (cannot be removed)

**Popular Websites:**
You'll also see a grid of popular websites you can add:
- YouTube (selected by default for new users)
- Gmail
- Google Drive
- GitHub
- And more...

### Keyboard Shortcuts

As you select features, Berri automatically assigns keyboard shortcuts:
- **First feature** → Control+1
- **Second feature** → Control+2
- **Third feature** → Control+3
- And so on...

**Special shortcuts:**
- YouTube gets **Control+Y** (if selected)
- Gmail gets **Control+G** (if selected)

You can customize these later in Settings.

## Screen 3: Complete

- Onboarding finishes
- Berri transitions to PowerStrip view
- You're ready to use Berri!

## You Can Always Change This Later

Don't stress about your choices:
- Go to **Settings → PowerStrip Customization** anytime
- Add, remove, or reorder features
- Add new websites or remove unused ones
- Adjust keyboard shortcuts

The onboarding just gives you a head start!`
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

### 2. Onboarding Customization
You'll customize which features and websites appear in your PowerStrip (see [Onboarding Flow](/guide/getting-started/onboarding))

### 3. Initial Setup
The app configures itself based on your choices

### 4. PowerStrip Mode
Berri automatically switches to its compact "Pill" mode for unobtrusive access

## Your First Berri Experience

- **Always Visible**: Berri stays on top of all other applications
- **Quick Access**: Use global keyboard shortcuts to interact without clicking
- **Smart Positioning**: The app positions itself intelligently based on your screen setup
- **Instant Availability**: Access your productivity tools without switching applications

## Default Configuration (If You Skip Customization)

If you click through onboarding without making changes:
- **Settings** - Always included (required)
- **YouTube** - Pre-selected for quick access
- **No other modules selected** - You'll add these in Settings later

This minimal setup lets you start quickly and customize as you explore Berri.`
      },
      {
        id: 'interface-overview',
        slug: 'interface-overview',
        title: 'Interface Overview',
        description: "Understanding Berri's three interface modes and basic concepts",
        category: 'getting-started',
        readingTime: 5,
        content: `# Interface Overview

## What is the PowerStrip?

The **PowerStrip** is Berri's floating toolbar - a small, customizable bar that stays visible above all your apps. It gives you instant access to your most-used features and websites without switching windows. You control what appears in it, where it sits on your screen, and how it's organized.

Berri has three distinct interface modes, each designed for different use cases:

## 1. Default View (Welcome Screen)
- **Purpose**: Initial setup and onboarding
- **Appearance**: Full welcome interface with customization options
- **When You'll See It**: Only during first launch and setup
- **Size**: Medium-sized window for comfortable setup

## 2. PowerStrip View (Compact Mode)
- **Purpose**: Unobtrusive access when you're focused on other work
- **Appearance**: Small, minimalist floating button/bar with your selected features
- **When to Use**: When you want Berri available but not distracting
- **Size**: Very small footprint on your screen

### Orientations:
- **Vertical**: Tall, narrow PowerStrip (35px wide × 190-350px tall, collapsed to expanded)
- **Horizontal**: Wide, short PowerStrip (230px wide × 40px tall)

## 3. Hover View (Expanded Mode)
- **Purpose**: Full access to all Berri features and tools
- **Appearance**: Complete interface with all your selected modules visible
- **When to Use**: When actively using Berri's productivity features
- **Size**: Customizable, larger window for comfortable interaction
- **Features**: Access to Notes, Clipboard, Files, Browse, Website Quick Access, and Settings
- **Customization**: Show/hide modules and reorder them in Settings > PowerStrip Customization

Each mode is optimized for different workflows and usage patterns.`
      }
    ]
  },
  {
    id: 'interface-navigation',
    title: 'Interface & Navigation',
    description: "Master Berri's movement, positioning, and shortcuts",
    icon: 'Navigation',
    pages: [
      {
        id: 'interface-modes',
        slug: 'interface-modes',
        title: 'Interface Modes',
        description: 'Deep dive into Default, PowerStrip, and Hover views',
        category: 'interface-navigation',
        readingTime: 4,
        content: `# Interface Modes

## Switching Between Modes

### Automatic Transitions
- **Startup**: Berri starts in Default view during first launch
- **After Onboarding**: Automatically transitions to PowerStrip mode
- **Activity-Based**: Switches to Hover view when accessing features

### Manual Control
- **Hover Over PowerStrip**: Temporarily expand to see more options
- **Click to Expand**: Click PowerStrip view to switch to Hover view
- **Background Click**: Click outside Hover view to return to PowerStrip
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

## PowerStrip Orientation Options

### Horizontal Orientation (Default)
- **Best For**: Top-of-screen placement
- **Position**: Usually centered at the top of your screen
- **Size**: 230px wide × 40px tall
- **Ideal When**: You want quick access without blocking side content
- **Default Setting**: New users automatically get horizontal orientation

### Vertical Orientation
- **Best For**: Side placement on wide screens
- **Position**: Usually placed on left or right screen edges
- **Size**: 35px wide × 190-350px tall (collapsed to expanded)
- **Ideal When**: You have horizontal screen space to spare

## Always-on-Top Behavior
- **Never Hidden**: Berri stays visible above all applications
- **Work Alongside**: Use other apps normally while Berri remains accessible
- **Incognito Mode Available**: Hide from screen recordings when needed (in Settings, Lifetime plan only)`
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

### From PowerStrip to Hover
- **Hover**: Simply move your mouse over the PowerStrip
- **Click**: Click anywhere on the PowerStrip to expand
- **Keyboard**: Use any module shortcut (Control+1-9)

### From Hover Back to PowerStrip
- **Background Click**: Click anywhere outside the Hover interface
- **Auto-Collapse**: Automatically collapses after inactivity (configurable)
- **Escape Key**: Press Escape to quickly return to PowerStrip mode

### Direct Module Access
- Use keyboard shortcuts to jump directly to specific modules
- Shortcuts are **dynamically assigned** based on module order (Control+1, Control+2, etc.)
- See [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) for complete details
- Customize module order in Settings → PowerStrip Customization

## Tips for Efficient Switching
- **Learn Your Module Shortcuts**: Check your specific Control+# assignments in Settings
- **Use Hover Behavior**: Quick preview without full expansion
- **Customize Auto-Collapse**: Set timing that matches your workflow
- **Reorder Modules**: Put frequently-used modules first for easier shortcuts (Control+1 is easier to reach than Control+7)`
      },
      {
        id: 'shortcuts',
        slug: 'shortcuts',
        title: 'Keyboard Shortcuts',
        description: 'Master all global keyboard shortcuts for maximum efficiency',
        category: 'interface-navigation',
        readingTime: 6,
        content: `# Keyboard Shortcuts
**Master Berri's global shortcuts for instant access**

Berri provides powerful global keyboard shortcuts that work from anywhere on your system.

## Primary Global Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| \`Control + E\` | Toggle Berri | Show/hide Berri instantly |

## Module Shortcuts (Dynamic Assignment)

⚠️ **CRITICAL CONCEPT:** Module shortcuts are **NOT fixed**!

### How Dynamic Shortcuts Work

Berri assigns shortcuts based on **the order modules appear in your PowerStrip**.

**Rule:** The order you see in your PowerStrip (top-to-bottom or left-to-right) determines shortcuts:
- **1st visible module** → Control+1
- **2nd visible module** → Control+2
- **3rd visible module** → Control+3
- **4th visible module** → Control+4
- **5th visible module** → Control+5
- And so on up to Control+9...

### Example: Sarah's Setup

Sarah enabled these modules during onboarding (in this order):
1. Notes
2. Clipboard
3. Files
4. Browse

Her shortcuts are:
- **Control+1** → Notes
- **Control+2** → Clipboard
- **Control+3** → Files
- **Control+4** → Browse

### Example: Mike's Setup

Mike enabled different modules (in this order):
1. Clipboard
2. Browse
3. Notes

His shortcuts are:
- **Control+1** → Clipboard (NOT Notes!)
- **Control+2** → Browse
- **Control+3** → Notes

**Notice:** Same modules, different order = different shortcuts!

### Special Shortcuts (Exceptions to the Rule)

Two websites have dedicated shortcuts regardless of position:
- **YouTube** → Control+Y (if visible)
- **Gmail** → Control+G (if visible)

All other modules follow the order-based rule.

### How to Check YOUR Shortcuts

Your shortcuts depend on YOUR customization. To check:

**Option 1: Visual Method**
1. Open Berri to Hover view
2. Look at your PowerStrip icons (top-to-bottom for vertical, left-to-right for horizontal)
3. Count visible items (skip Settings)
4. First = Control+1, second = Control+2, etc.

**Option 2: Settings Method**
1. Settings → PowerStrip Customization
2. View "Visible Modules" section
3. Count from top to bottom
4. First = Control+1, second = Control+2, etc.

**Option 3: Keyboard Shortcuts Page**
1. Settings → Keyboard Shortcuts
2. See complete list with current assignments

### Why Dynamic Shortcuts?

This system gives you flexibility:
- **You control priority**: Put most-used module first (Control+1 is easiest)
- **No hardcoded limitations**: Any module can be Control+1
- **Natural organization**: Visual order matches keyboard order

### Changing Your Shortcuts

Want a specific module on Control+1?
1. Go to **Settings** → **PowerStrip Customization**
2. Drag that module to the **first position**
3. Shortcuts update automatically!

**Example:** Sarah wants Clipboard on Control+1 instead of Notes.
- She drags Clipboard above Notes in PowerStrip Customization
- Now: Control+1 = Clipboard, Control+2 = Notes

📖 **Learn More:** See [Customizing Your PowerStrip](/guide/interface-navigation/pill-customization) for full customization guide.

## Modules Without Default Shortcuts

Some modules are **hidden by default** and have no shortcut until you enable them:
- **Snipping Tool** - Must enable in PowerStrip Customization
- **Google Meet** - Must enable in PowerStrip Customization
- **Screen Capture** - Must enable in PowerStrip Customization

Once enabled, they follow the same order-based rule (or you can assign custom shortcuts manually).

## How Global Shortcuts Work

### System-Wide Access
- **Works Everywhere**: Shortcuts work from any application, even when Berri isn't focused
- **Instant Access**: No need to click or find Berri - just press the shortcut
- **Mode-Aware**: Automatically opens the appropriate view mode
- **Efficient Workflow**: Keep working in other apps while accessing Berri features

### Shortcut Behavior
- **Toggle Berri (Control+E)**: Show Berri if hidden, hide if visible
- **Module Shortcuts (Control+1-9)**:
  - If Berri is hidden, shows Berri and opens that module
  - If Berri is visible, switches to that module
  - If already on that module, hides Berri

## Troubleshooting Shortcuts

### Shortcut Not Working?
1. **Check Accessibility Permissions**: System Settings → Privacy & Security → Accessibility
2. **Verify Module Visibility**: Hidden modules don't have shortcuts
3. **Check Module Order**: Your shortcut may have changed if you reordered modules
4. **Restart Berri**: Sometimes required after permission changes

### Wrong Module Opening?
- You may have reordered modules. Check Settings → PowerStrip Customization to see current order.
- Remember: Shortcuts follow visual order, not alphabetical or any fixed pattern.

### Shortcut Conflicts?
- If another app uses the same shortcut, macOS may prioritize it
- Consider reordering modules to use a different Control+# shortcut
- Or disable the conflicting shortcut in the other app

## Pro Tips

### Muscle Memory
- **Practice Daily**: Use shortcuts instead of clicking for faster access
- **Start with Control+E**: Master the toggle first, then add module shortcuts
- **Customize Your Setup**: Put your most-used module on Control+1

### Workflow Integration
- **Quick Tasks**: Keep Berri hidden, use shortcuts when needed
- **Focus Mode**: Use Control+E during presentations or deep focus work
- **Module Hopping**: Jump between modules with Control+1-9 without using mouse

### Efficiency Tips
- **Reorder for Speed**: Put frequently-used modules on Control+1, Control+2, Control+3
- **Hide Unused Modules**: Keeps your shortcuts predictable and consistent
- **Learn Your Numbers**: Memorize which Control+# opens which module in YOUR setup

## Summary

**Key Takeaway:** Don't memorize "Control+4 is always Notes." Instead, think:
- "My first module is Notes, so Control+1 opens Notes"
- "I can change this anytime by reordering"

This gives you complete control over your workflow!`
      },
      {
        id: 'pill-customization',
        slug: 'pill-customization',
        title: 'Customizing Your PowerStrip',
        description: 'Personalize module order, visibility, and shortcuts',
        category: 'interface-navigation',
        readingTime: 8,
        content: `# Customizing Your PowerStrip
**Make Berri work exactly how you want**

## What You Can Customize

1. **Module visibility** - Show/hide modules
2. **Module order** - Rearrange PowerStrip icons
3. **Keyboard shortcuts** - Control which Control+# opens which module
4. **Websites** - Add custom sites (1 for Free, 12 for Lifetime)
5. **Pill orientation** - Vertical or horizontal layout

## Accessing Customization

**Settings → PowerStrip Customization**

## Settings Module (Special Status)

Before we dive in, understand Settings module's unique behavior:

### Always Present
- **Cannot be hidden** - Settings is always visible
- **Cannot be removed** - It's a core feature
- **Yellow lock icon** - Visual indicator during onboarding

### Doesn't Count Toward Limit
- **Free plan:** 5 modules + Settings (6 total visible)
- **Lifetime plan:** 12 modules + Settings (13 total visible)

### No Automatic Shortcut
- Settings typically doesn't get Control+1, Control+2, etc.
- You can manually assign a shortcut in Settings → Keyboard Shortcuts
- Most users access Settings via the gear icon, not keyboard

## Understanding Module Order

### Why Order Matters

⚠️ **Module order determines keyboard shortcuts!**

- First visible module → Control+1
- Second visible module → Control+2
- Third visible module → Control+3
- And so on...

**Example - Your Custom Setup:**
- Clipboard (1st) → Control+1
- Notes (2nd) → Control+2
- Files (3rd) → Control+3
- Settings (appears last, no auto-shortcut)

### Reordering Modules

1. Settings → PowerStrip Customization
2. **Visible Modules** section shows current order
3. Click and drag module icons
4. Drop in new position
5. Changes save automatically

⚠️ **Important:** Reordering changes shortcuts automatically!

### Example: Reordering Impact

**Before reorder:**
- Notes → Control+1
- Clipboard → Control+2
- Files → Control+3

**After moving Clipboard to first:**
- Clipboard → Control+1 (now first!)
- Notes → Control+2 (shifted down)
- Files → Control+3 (unchanged)

**Your muscle memory must adapt!**

## Plan Limits & Module Selection

### Free Plan (Berri Free)
- **5 modules** (Settings doesn't count)
- **1 custom website** (YouTube included by default)
- **FIFO replacement**: When you try to add a 6th module, oldest is auto-removed

### Lifetime Plan
- **12 modules** (Settings doesn't count)
- **12 custom websites** (YouTube included by default)
- **No FIFO**: You can freely add/remove without auto-replacement

## FIFO Auto-Replacement (Free Plan Only)

### What is FIFO?

FIFO stands for "First-In, First-Out" - but think of it as:
**"Oldest selection gets replaced when you're at the limit"**

### How It Works

1. You're on Free plan (5 module limit)
2. You've already selected 5 modules: Notes, Clipboard, Files, Browse, Google Meet (oldest to newest)
3. You try to add a 6th module: **Snipping Tool**

**What happens:**
- **Notes** (the oldest selection) is automatically deselected
- **Snipping Tool** is added in its place
- Your new selection: Clipboard, Files, Browse, Google Meet, Snipping Tool (5 total)

### Visual Feedback

During customization, you'll see:
- **"Features (5/5)"** - Shows you're at the limit
- **No error messages** - Oldest module just silently deselects
- **Smooth experience** - You're never blocked from trying new modules

### Selection Order Tracking

Berri tracks the **order you selected modules** (not their display order):

**Example:**
1. First, you select **Clipboard**
2. Then, you select **Notes**
3. Then, you select **Files**

If you're at the limit and add a 4th module, **Clipboard gets removed** (oldest selection), even if it's not first visually.

### Disabling Modules (Free Plan)

When you manually deselect a module:
- It's removed from the selection order
- Doesn't count toward your 5
- If you re-select it later, it becomes the "newest" selection

**Example:**
- Current: Clipboard, Notes, Files (oldest to newest)
- You manually deselect Notes
- New order: Clipboard, Files
- You select Browse
- New order: Clipboard, Files, Browse (oldest to newest)

## Showing & Hiding Modules

### PowerStrip Customization Screen Layout

Two sections:

**Visible Modules:**
- Currently shown in PowerStrip
- Have assigned shortcuts (based on order)
- Draggable to reorder

**Hidden Modules:**
- Available but not in PowerStrip
- No assigned shortcuts
- Can be revealed anytime

### Hiding a Module

1. Settings → PowerStrip Customization
2. In **Visible Modules**, click and drag module
3. Drop into **Hidden Modules** section
4. Module disappears from PowerStrip
5. Other modules' shortcuts shift up

**Effects:**
- ❌ No longer in PowerStrip
- ❌ Shortcut unassigned (other modules shift)
- ❌ Not accessible via keyboard
- ✅ Can be re-shown anytime

**Example:**
- Before: Notes (Control+1), Clipboard (Control+2), Files (Control+3)
- You hide Clipboard
- After: Notes (Control+1), Files (Control+2)
- Notice: Files shifted from Control+3 → Control+2

### Showing a Hidden Module

1. Settings → PowerStrip Customization
2. In **Hidden Modules**, find the module
3. Drag to **Visible Modules**
4. Position where you want it
5. Auto-assigned shortcut based on position

**Effects:**
- ✅ Appears in PowerStrip
- ✅ Gets shortcut (Control+N where N is position)
- ✅ Keyboard accessible

**Free Plan Note:** If you're at 5/5 modules, showing a 6th will auto-hide the oldest (FIFO).

## Managing Websites

### Adding Websites

See [Website Quick Access](/guide/feature-modules/website-quick-access) for full details.

**Quick steps:**
1. Settings → Quick Websites
2. "Add Website" button
3. Enter URL, label
4. Optional: Assign custom shortcut
5. Appears in PowerStrip

### Website Order
- Websites appear in PowerStrip alongside modules
- Can be reordered with drag-and-drop
- Order affects shortcuts (same as modules)
- **Exception:** YouTube (Control+Y) and Gmail (Control+G) have special shortcuts

### Website Limits
- **Free:** 1 custom website (YouTube included by default doesn't count)
- **Lifetime:** 12 custom websites (YouTube doesn't count)
- Hidden websites count toward limit

## PowerStrip Orientation

### Horizontal (Default)

**Dimensions:** 230px wide × 40px tall

**Best for:**
- Top placement (centered or corner)
- Ultrawide monitors
- More horizontal screen space available

**Position:** Usually top of screen

### Vertical

**Dimensions:** 35px wide × 190-350px tall
- Collapsed: 190px
- Expanded: 350px (when hovering)

**Best for:**
- Side placement (left or right edge)
- Wide monitors
- More vertical screen space available

**Position:** Usually left or right screen edge

### Switching Orientation

1. Settings → Appearance
2. Find "PowerStrip Orientation"
3. Select: Vertical or Horizontal
4. PowerStrip repositions automatically

**Note:** Orientation doesn't affect shortcuts or module order.

## Best Practices

### 1. Prioritize Most-Used Modules

Put frequently used modules first (lower numbers = faster reach):

**Good:**
- Control+1: Your most-used feature
- Control+2: Second-most-used
- Control+3-5: Occasionally used

**Bad:**
- Control+1: Settings (rarely used)
- Control+2: Rarely-used feature
- Control+7: Your most-used feature (too far)

### 2. Build Muscle Memory

- **Don't change order frequently** - Consistency builds habits
- **Practice new shortcuts** - After reordering, practice 10-20 times
- **Group related modules** - Keep similar modules together conceptually

### 3. Hide Unused Modules

- **Keep PowerStrip clean** - Only show what you use weekly
- **Reduce clutter** - Fewer icons = easier visual scanning
- **Shortcuts still work** - Hiding doesn't disable (you can manually assign shortcuts)

### 4. Strategic Shortcut Assignment

**Number shortcuts (automatic):**
- Control+1-3: Core features (most frequent)
- Control+4-6: Secondary features
- Control+7-9: Rarely used but accessible

**Custom shortcuts (manual):**
You can override the automatic assignment in Settings → Keyboard Shortcuts:
- Control+S for Snipping Tool
- Control+M for Google Meet
- Control+N for Notes

### 5. Review Quarterly

Every 3 months:
1. Review module usage (which ones you actually use)
2. Hide unused modules
3. Reorder based on actual usage patterns
4. Remove unused websites

## Common Workflows

### Minimalist Setup (3-4 Modules)
- Notes, Clipboard, Files (+ Settings)
- Very clean PowerStrip
- Fast keyboard access
- Perfect for casual users

### Power User Setup (7-9 Modules)
- All core features visible
- Multiple websites
- Horizontal orientation for space
- For users who live in Berri

### Developer Setup Example
1. Notes (Control+1) - Quick TODOs
2. Clipboard (Control+2) - Code snippets
3. Files (Control+3) - Project files
4. GitHub website (Control+4)
5. Linear website (Control+5)
6. Settings (no shortcut, use gear icon)

### Content Creator Setup Example
1. Notes (Control+1) - Script drafts
2. YouTube Studio (Control+Y) - Analytics
3. Notion website (Control+3) - Content calendar
4. Snipping Tool (Control+S) - Screenshots
5. Settings (gear icon)

## Troubleshooting

### Shortcuts Changed After Reordering
- **Expected behavior** - Order determines shortcuts
- Review new shortcuts in Settings → Keyboard Shortcuts
- Practice new shortcuts 10-20 times to rebuild muscle memory

### Module Disappeared
- Check Settings → PowerStrip Customization
- Likely moved to Hidden Modules
- Drag back to Visible to restore

### Can't Add More Modules (Free Plan)
- You're at 5/5 modules
- Try adding anyway - FIFO will auto-replace oldest
- Or manually remove one first
- Upgrade to Lifetime for 12 modules

### Can't Add More Modules (Lifetime Plan)
- You're at 12/12 modules (maximum)
- Remove unused modules first
- Consider hiding rarely-used ones

### Drag-and-Drop Not Working
- Ensure you're in Settings → PowerStrip Customization
- Click and hold firmly before dragging
- Try restarting Berri if persistent

## Tips for Efficient PowerStrip Management

### Start Small, Grow Gradually
- Begin with 3-4 core modules
- Add more as you discover needs
- Don't overwhelm yourself with all modules at once

### Experiment with Orientation
- Try horizontal for a week
- Try vertical for a week
- Choose based on actual usage comfort

### Use Visual Position Memory
- Remember icon positions visually
- Don't rely solely on shortcuts
- Visual + keyboard = fastest workflow

## Related Features
- [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) - Understanding dynamic shortcuts
- [Website Quick Access](/guide/feature-modules/website-quick-access) - Add custom sites
- [Interface Modes](/guide/interface-navigation/interface-modes) - PowerStrip, Default, Hover views`
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
- Permissions can be revoked at any time through System Settings

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
- **Snipping Tool** - Quick screenshot capture with automatic Berri hiding
- **Screen Capture Module** - Advanced screen recording and capture with macOS toolbar
- **Screen capture with text recognition** (OCR)
- **Preview screenshots** before saving

## How It's Used
- Only when you actively use screenshot or screen recording features
- Never runs in the background
- You control when screenshots/recordings are taken
- Required for both Snipping Tool and Screen Capture modules

## Privacy Protection
- Screenshots are processed locally, never sent anywhere
- No automatic or scheduled captures
- You see exactly what's being captured

## How to Grant
1. **During Setup**: Berri will request this permission automatically
2. **System Settings**: Go to System Settings → Privacy & Security → Screen Recording
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
- **Global keyboard shortcuts** (Control+E and module shortcuts)
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
2. **System Settings**: Go to System Settings → Privacy & Security → Accessibility
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
2. **System Settings**: Go to System Settings → Privacy & Security → Full Disk Access
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
    description: "Deep dive into each of Berri's productivity modules",
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
- **Shortcut**: Depends on your module order (see Settings → Keyboard Shortcuts)
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
- **Shortcut**: Depends on your module order (see Settings → Keyboard Shortcuts)
- **Interface**: Click the Clipboard icon in Hover view
- **Quick Paste**: Available from PowerStrip view for recent items

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
- **Shortcut**: Depends on your module order (see Settings → Keyboard Shortcuts)
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
        title: 'Browse Module',
        description: 'Web browsing with popular sites grid on new tab',
        category: 'feature-modules',
        readingTime: 4,
        content: `# Browse Module
**Web browsing with quick access to popular sites**

## What It Does
- Browse the web with a built-in browser
- Quick access to popular websites via grid on new tab page
- Maintain login sessions across visits
- History and navigation controls

## Key Features

### Popular Sites Grid (New Tab Page)

When you open a new tab in Browse, you'll see a grid of popular websites:
- **Quick Access**: Click any site to visit instantly
- **No Manual Adding**: Popular sites are curated by Berri
- **Always Updated**: Grid refreshes with latest popular sites
- **Unlimited Selection**: Choose from dozens of pre-vetted sites

**Example sites in the grid:**
- YouTube
- Gmail
- Google Drive
- GitHub
- Reddit
- LinkedIn
- And many more...

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

## How Popular Sites Grid Works

1. **Open Browse module** (via shortcut or PowerStrip icon)
2. **Click "+ New Tab"** or start with default new tab
3. **See grid of popular sites**
4. **Click any site** to visit
5. **Sites load instantly** - no typing URLs

### Difference from Website Quick Access

**Browse Module Popular Sites:**
- Grid appears only in Browse module
- Click to visit, no dedicated PowerStrip icon
- Unlimited access to all popular sites
- Great for exploring or occasional use

**Website Quick Access (Custom Websites):**
- Each site gets dedicated PowerStrip icon
- Persistent sessions stay loaded
- Custom keyboard shortcuts
- Limited by plan (1 free, 12 lifetime)
- Perfect for sites you visit daily

**When to use each:**
- **Browse popular sites grid**: Occasional visits, exploring sites
- **Website Quick Access**: Daily-use sites (Gmail, Notion, etc.)

## How to Access
- **Shortcut**: Depends on your module order (see Settings → Keyboard Shortcuts)
- **Interface**: Click the Browse icon in Hover view

## Best Practices
- Use Browse for general browsing and popular sites
- Add frequently-visited sites to Website Quick Access (Settings → Quick Websites)
- Sessions stay logged in for convenience`
      },
      {
        id: 'website-quick-access',
        slug: 'website-quick-access',
        title: 'Website Quick Access',
        description: 'Add custom websites with dedicated shortcuts',
        category: 'feature-modules',
        readingTime: 6,
        content: `# Website Quick Access
**Add your favorite websites for instant access with custom shortcuts**

## What It Is

Website Quick Access lets you add specific websites directly to your Berri PowerStrip, each with its own dedicated icon and persistent login sessions.

**Think of it as:** Bookmarks on steroids - instant access, always logged in, custom shortcuts.

## How It's Different from Browse

Berri has TWO ways to access websites:

### Browse Module
- General web browsing with popular sites grid
- All browsing happens in one module
- Navigate between different pages
- Like a mini web browser
- Perfect for occasional visits

### Website Quick Access (This Feature)
- Dedicated PowerStrip icon for EACH website
- Each site gets its own WebView (stays loaded)
- Optional custom keyboard shortcut per site
- Perfect for sites you visit multiple times daily
- Always logged in, always ready

**Example:**
- **Browse module:** Check Reddit occasionally, explore popular sites from grid
- **Website shortcuts:** Gmail (always open), Notion (always logged in), GitHub (instant access)

## Plan Limits

- **Free Plan:** 1 custom website
- **Lifetime Plan:** Up to 12 custom websites

**Note:** YouTube is included by default and doesn't count toward your limit.

## How to Add a Website

1. Open Berri
2. Click **Settings** (gear icon)
3. Navigate to **Quick Websites**
4. Click **"Add Website"** button
5. Enter the website URL (e.g., \`https://mail.google.com\`)
6. Give it a label (e.g., "Gmail")
7. (Optional) Assign a keyboard shortcut
8. Click **Save**

The website now appears in your PowerStrip!

## Assigning Shortcuts

When adding a website, you can assign a custom shortcut:

1. In the "Add Website" dialog, click the shortcut field
2. Press your desired key combination (e.g., Control+5)
3. Berri validates the shortcut (checks for conflicts)
4. If available, the shortcut is assigned

**Rules:**
- Must be unique (no duplicates with other modules/websites)
- Format: Control+Number or Control+Letter
- Can be changed later in Settings

**Special Shortcuts (Automatic):**
- YouTube gets **Control+Y** (if visible)
- Gmail gets **Control+G** (if visible)

**Tip:** Use memorable shortcuts like Control+M for Gmail (M for Mail)

## Managing Websites

### Reordering
1. Settings → PowerStrip Customization
2. Drag website icons to reorder
3. Order affects visual position (shortcuts are custom, not order-based)

### Hiding/Showing
1. Settings → PowerStrip Customization
2. Toggle visibility for each website
3. Hidden websites still count toward limit
4. Can be re-shown anytime

### Removing
1. Settings → Quick Websites
2. Find the website
3. Click the **X** or **Remove** button
4. Confirm deletion

### Editing
1. Settings → Quick Websites
2. Click the website to edit
3. Update URL, label, or shortcut
4. Save changes

## Session Persistence

Websites stay logged in between uses:

- Each website has its own WebView (isolated session)
- Cookies and login state persist
- No need to re-authenticate every time
- Just like keeping a tab open in your browser

**Example:** Add Gmail, log in once, it stays logged in forever (until you log out or clear data)

## Default Website: YouTube

Berri includes YouTube by default:

- Pre-configured for new users
- Doesn't count toward your website limit
- Can be hidden if you don't want it (Settings → PowerStrip Customization)
- Cannot be removed (but can be hidden)
- Gets **Control+Y** shortcut (special assignment)

## Tips & Best Practices

### Choose Wisely
- Add sites you visit 5+ times per day
- Work tools: Gmail, Slack, Notion, Linear, etc.
- Frequent references: Docs, dashboards, admin panels

### Optimize Shortcuts
- Use Control+Number for most frequent (easier to reach)
- Use Control+Letter for memorable access (Control+G for Gmail)
- Leave Control+1-3 for core Berri modules

### Stay Organized
- Use clear labels ("Work Gmail" vs "Personal Gmail")
- Hide websites you rarely use (keep PowerStrip clean)
- Review and remove unused websites monthly

## Troubleshooting

### Website Won't Load
- Check internet connection
- Verify URL is correct (include \`https://\`)
- Try removing and re-adding

### Shortcut Not Working
- Check Settings → Keyboard Shortcuts
- Verify no conflicts with other modules
- Ensure website is visible (not hidden)
- Restart Berri if shortcut was just assigned

### Can't Add More Websites
- Check your plan limit (1 free, 12 lifetime)
- Hidden websites still count toward limit
- Remove unused websites to free slots
- Upgrade to Lifetime for more slots

## Example Workflows

### Developer Workflow
- Control+1: Notes
- Control+2: Clipboard
- Control+3: Files
- Control+G: Gmail (custom website)
- Control+5: Linear (custom website)
- Control+6: Vercel (custom website)

### Content Creator Workflow
- Control+1: Notes
- Control+Y: YouTube (default)
- Control+3: Notion (custom website)
- Control+4: Figma (custom website)
- Control+5: Google Drive (custom website)

### Student Workflow
- Control+1: Notes (class notes)
- Control+2: Google Classroom (custom website)
- Control+3: Canvas LMS (custom website)
- Control+4: Google Docs (custom website)
- Control+G: Gmail

## Related Features
- [Browse Module](/guide/feature-modules/webview) - General web browsing with popular sites
- [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) - Understanding shortcuts
- [PowerStrip Customization](/guide/interface-navigation/pill-customization) - Organize your PowerStrip`
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
- Configure shortcuts and preferences
- Manage PowerStrip customization and module order
- Add custom websites

## Special Status

Settings is unique among modules:
- **Always visible** - Cannot be hidden or removed
- **Yellow lock icon** - During onboarding, shows it's locked
- **Doesn't count toward limit** - Free: 5 modules + Settings, Lifetime: 12 modules + Settings
- **No automatic shortcut** - Access via gear icon or manually assign a shortcut

## Key Features

### Appearance
- **Colors**: Customize theme colors and accents
- **Transparency**: Adjust window opacity levels
- **Positioning**: Set default positions for different modes
- **Size**: Configure default window sizes
- **PowerStrip Orientation**: Choose vertical or horizontal layout

### Behavior
- **Auto-start**: Launch Berri when system starts
- **Shortcuts**: Customize global keyboard shortcuts
- **Notifications**: Control when and how Berri notifies you
- **Auto-collapse**: Set timing for automatic mode switching

### PowerStrip Customization
- **Module Order**: Drag-and-drop to reorder visible items
- **Visibility**: Show/hide modules from your PowerStrip
- **Shortcuts**: View current shortcut assignments based on order
- **Orientation**: Choose vertical or horizontal PowerStrip layout
- See [Customizing Your PowerStrip](/guide/interface-navigation/pill-customization) for details

### Privacy
- **Incognito Mode**: Hide from screen recordings and screenshots (Lifetime plan only)
- **Data Management**: Control what data is stored locally
- **Permission Status**: View and manage system permissions
- **History Limits**: Set retention periods for different modules

### Quick Websites
- **Add Websites**: Add custom websites with dedicated shortcuts (see [Website Quick Access](/guide/feature-modules/website-quick-access))
- **Manage Websites**: Edit, remove, or organize sites
- **Plan Limits**: View how many sites you can add (1 free, 12 lifetime)

### Keyboard Shortcuts
- **View All Shortcuts**: See complete list with current assignments
- **Custom Assignment**: Manually assign shortcuts to modules
- **Conflict Detection**: Berri warns about duplicate shortcuts

### Updates
- **Automatic Updates**: Control update preferences
- **Notification Settings**: Choose how to be notified of updates
- **Beta Features**: Opt into experimental features
- **Version Information**: View current version and changelog

## How to Access
- **Gear Icon**: Click the gear icon visible in all views
- **Module Access**: Settings appears as a module in your PowerStrip
- **Custom Shortcut**: Assign a shortcut in Settings → Keyboard Shortcuts (no default)

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
- Use PowerStrip Customization to personalize your workflow
- Start with module reordering to optimize your shortcuts
- Hide unused modules to keep your PowerStrip clean and shortcuts predictable
- Check Keyboard Shortcuts page to see current assignments`
      },
      {
        id: 'snipping-tool',
        slug: 'snipping-tool',
        title: 'Snipping Tool',
        description: 'Quick screenshot capture with automatic Berri hiding',
        category: 'feature-modules',
        readingTime: 5,
        content: `# Snipping Tool
**Quick screenshot capture with automatic Berri hiding**

## What It Does

The Snipping Tool lets you capture screenshots by temporarily hiding Berri and launching macOS's native screenshot selection tool.

**Perfect for:** Quick screenshots, visual documentation, sharing screen snippets

## How It Works

1. Press your assigned shortcut (no default - you must assign one)
2. Berri automatically hides itself (becomes invisible)
3. macOS screenshot selection tool appears
4. Click and drag to select area
5. Release to capture
6. Screenshot is saved and Berri reappears

**Key Feature:** Berri hides during capture so it doesn't appear in your screenshots!

## Hidden by Default

⚠️ **Important:** Snipping Tool is **hidden by default**. You must:
1. Enable it in Settings → PowerStrip Customization
2. Assign it a keyboard shortcut in Settings → Keyboard Shortcuts

## Enabling Snipping Tool

**Step 1: Make it visible**
1. Settings → PowerStrip Customization
2. Find "Snipping Tool" in **Hidden Modules**
3. Drag to **Visible Modules** section
4. Position where you want it

**Step 2: Assign a shortcut**
1. Settings → Keyboard Shortcuts
2. Find "Snipping Tool" in the list
3. Click the shortcut field
4. Press your desired key combination
5. Berri saves it automatically

**Suggested shortcuts:**
- \`Control+Shift+S\` (S for Screenshot) ✅
- \`Control+Shift+C\` (C for Capture)
- \`Control+S\` (if not used by other modules)

**Note:** You can use the shortcut even if Snipping Tool is hidden from the PowerStrip.

## Technical Details

### What Happens Behind the Scenes
1. Berri sets window opacity to 0 (invisible but still running)
2. Calls macOS \`screencapture -i\` command (\`-i\` = interactive selection)
3. Waits for you to complete the capture
4. Processes the screenshot
5. Restores Berri window opacity to 1 (visible again)

### Security
- Uses macOS built-in screencapture (no third-party tools)
- Requires **Screen Recording permission** (System Settings)
- Screenshots saved to your default location (Desktop or custom)

## Difference: Snipping Tool vs Screen Capture

Berri has TWO screenshot-related modules:

| Feature | Snipping Tool | Screen Capture |
|---------|---------------|----------------|
| **Purpose** | Quick selection screenshots | Advanced capture & recording |
| **Interface** | Minimal (just selection) | Full macOS toolbar |
| **Video recording** | ❌ No | ✅ Yes |
| **Window capture** | ❌ No | ✅ Yes |
| **Timer** | ❌ No | ✅ Yes (5s, 10s) |
| **Save options** | Auto-save only | Desktop, Clipboard, Mail, etc. |
| **Best for** | 90% of screenshots | Advanced needs, tutorials |

**When to use each:**
- **Snipping Tool:** Quick, everyday screenshots
- **Screen Capture:** Video recording, tutorials, advanced options

## Required Permission

Both screenshot features require **Screen Recording permission**:

### Granting Permission
1. System Settings → Privacy & Security
2. Click **Privacy** tab
3. Select **Screen Recording** from left sidebar
4. Check the box next to **Berri**
5. Restart Berri if prompted

### Why This Permission?
macOS requires Screen Recording permission for ANY screenshot functionality, including the built-in screencapture command.

**Privacy Note:** Berri only captures when YOU trigger it with the shortcut. No automatic or background capturing.

## Usage Tips

### Quick Capture Workflow
1. See something worth capturing
2. Press your Snipping Tool shortcut
3. Select area
4. Done! Screenshot saved

### Where Screenshots Go
By default, macOS saves screenshots to:
- **Desktop** (older macOS versions)
- **Screenshots folder** in Documents (newer versions)

To change location:
1. Open macOS Screenshot toolbar (Shift+Cmd+5)
2. Click **Options**
3. Choose save location

### File Naming
Screenshots are auto-named:
- Format: \`berri-capture-[timestamp].png\`
- Example: \`berri-capture-1704067200000.png\`

## Troubleshooting

### Shortcut Does Nothing
1. Check if shortcut is assigned (Settings → Keyboard Shortcuts)
2. Verify Snipping Tool is enabled (Settings → PowerStrip Customization, can be hidden but enabled)
3. Ensure Screen Recording permission is granted
4. Try assigning a different shortcut

### Berri Doesn't Hide
- This is a rare opacity issue
- Force quit Berri and restart
- Check macOS version compatibility

### Screenshots Are Blank
- Screen Recording permission not granted
- Grant permission and restart Berri
- Check System Settings → Privacy & Security → Screen Recording

### Can't Find Screenshots
- Check Desktop folder
- Check Documents → Screenshots
- Review macOS screenshot save location (Shift+Cmd+5 → Options)

## Example Workflows

### Documentation Writer
1. Write instructions
2. Control+Shift+S (Snipping Tool)
3. Capture relevant UI
4. Paste into documentation

### Bug Reporter
1. Encounter bug
2. Control+Shift+S
3. Capture error message
4. Attach to GitHub issue

### Designer
1. See design inspiration
2. Control+Shift+S
3. Quick reference capture
4. Add to mood board

## Related Features
- [Screen Capture Module](/guide/feature-modules/screen-capture) - Advanced capture toolbar
- [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) - Assign shortcuts
- [Permissions Setup](/guide/permissions-setup/screen-recording) - Grant permissions`
      },
      {
        id: 'google-meet',
        slug: 'google-meet',
        title: 'Google Meet Integration',
        description: 'Quick access to start or join Google Meet calls',
        category: 'feature-modules',
        readingTime: 4,
        content: `# Google Meet Integration
**Instant access to Google Meet video calls**

## What It Does

The Google Meet module provides one-click access to start or join Google Meet video calls directly from Berri.

**Perfect for:** Remote workers, frequent meeting participants, quick video calls

## How It Works

When activated, Google Meet:
1. Opens the Browse module
2. Navigates to meet.google.com
3. You can start a new meeting or enter a meeting code
4. Login session persists (stay logged in)

**Think of it as:** A dedicated button for Google Meet in your productivity bar.

## Hidden by Default

⚠️ **Important:** Google Meet is **hidden by default**. You must:
1. Enable it in Settings → PowerStrip Customization
2. Optionally assign it a keyboard shortcut

## Enabling Google Meet

**Step 1: Make it visible**
1. Settings → PowerStrip Customization
2. Find "Google Meet" in **Hidden Modules**
3. Drag to **Visible Modules** section
4. Position where you want it

**Step 2: Use automatic or custom shortcut**
- **Automatic**: If you put Google Meet as 3rd visible module, it gets Control+3
- **Custom**: Go to Settings → Keyboard Shortcuts and assign manually (e.g., Control+M)

**Suggested shortcuts:**
- \`Control+M\` (M for Meet) ✅
- \`Control+V\` (V for Video)
- Or use position-based (Control+1-9 depending on order)

**Note:** You can use the shortcut even if Google Meet is hidden from the PowerStrip.

## Usage Scenarios

### Starting a New Meeting
1. Activate Google Meet (shortcut or PowerStrip icon)
2. Click "New meeting"
3. Choose:
   - Start an instant meeting
   - Create a meeting for later
   - Schedule in Google Calendar

### Joining a Meeting
1. Activate Google Meet
2. Click "Enter a code or link"
3. Paste meeting code or URL
4. Click "Join"

### Quick Meeting from Keyboard
1. Press your Google Meet shortcut (e.g., Control+M)
2. Click "New meeting" → "Start an instant meeting"
3. Share the link with participants
4. Start talking!

**Time savings:** 2-3 seconds vs opening browser, navigating to Meet, clicking buttons.

## Login & Authentication

### First Time Setup
1. Activate Google Meet module
2. Sign in with your Google account
3. Grant necessary permissions
4. Session persists - you stay logged in

### Session Persistence
- Login saved between Berri sessions
- No need to re-authenticate
- Just like keeping a browser tab open
- Can log out manually if needed

## Technical Details

**What Happens:**
- Sends IPC message: \`trigger-google-meet\`
- Main process receives message
- Opens Browse module
- Loads meet.google.com
- Browse module displays Google Meet interface

## Difference: Google Meet vs Browse

### Google Meet Module
- **One purpose:** Access Google Meet
- **Dedicated shortcut:** Custom keyboard shortcut or position-based
- **Quick access:** One keypress to meet.google.com
- **Best for:** Frequent meeting users

### Browse Module
- **Multi-purpose:** Access any website
- **General browsing:** Navigate between sites
- **Best for:** General web access

**Use both:** Google Meet for instant calls, Browse for general work.

## Troubleshooting

### Shortcut Doesn't Work
1. Verify Google Meet is enabled (Settings → PowerStrip Customization)
2. Check if shortcut is assigned (Settings → Keyboard Shortcuts)
3. Check for conflicts with other modules
4. Restart Berri

### Stuck on Login Screen
1. Check internet connection
2. Verify Google account credentials
3. Try accessing meet.google.com in regular browser

### Module Doesn't Appear
- Google Meet is hidden by default
- Add to visible items in PowerStrip Customization
- Or just use the keyboard shortcut (works even if hidden)

### Meet Features Not Working
- Some advanced features require browser extensions
- Berri uses WebView (limited extension support)
- For full features, use dedicated browser
- Core features (video, audio, screen share) work fine

## Example Workflows

### Remote Worker
- Control+M: Instant access to join daily standup
- Meeting link in clipboard → Activate → Paste → Join
- **Time saved:** 5-10 seconds per meeting

### Customer Support
- Customer requests video call
- Control+M → New meeting
- Copy link → Send to customer
- **Start time:** Under 5 seconds

### Teacher/Tutor
- Schedule meetings in advance
- Control+M → Access scheduled meetings
- One click to start class

## Related Features
- [Browse Module](/guide/feature-modules/webview) - General web browsing
- [Website Quick Access](/guide/feature-modules/website-quick-access) - Add custom sites
- [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) - Understanding shortcuts`
      },
      {
        id: 'screen-capture',
        slug: 'screen-capture',
        title: 'Screen Capture Module',
        description: 'Advanced screen recording and capture with macOS toolbar',
        category: 'feature-modules',
        readingTime: 5,
        content: `# Screen Capture Module
**Full macOS screen capture toolbar with advanced options**

## What It Does

The Screen Capture module opens macOS's native screen capture toolbar (the one you'd normally access with Shift+Cmd+5), giving you advanced screenshot and screen recording capabilities.

**Perfect for:** Video tutorials, advanced screenshots, timed captures, window-specific captures

## How It Works

1. Press your assigned shortcut (no default - you must assign one)
2. macOS screen capture toolbar appears
3. Choose capture mode:
   - Entire screen
   - Selected window
   - Selected portion
   - Record entire screen
   - Record selected portion
4. Configure options (timer, save location, etc.)
5. Capture or record

**Key Difference from Snipping Tool:** Full macOS toolbar with all features vs simple selection.

## Hidden by Default

⚠️ **Important:** Screen Capture is **hidden by default**. You must:
1. Enable it in Settings → PowerStrip Customization
2. Assign it a keyboard shortcut

## Enabling Screen Capture

**Step 1: Make it visible**
1. Settings → PowerStrip Customization
2. Find "Screen Capture" in **Hidden Modules**
3. Drag to **Visible Modules** section
4. Position where you want it

**Step 2: Assign a shortcut**
1. Settings → Keyboard Shortcuts
2. Find "Screen Capture"
3. Click shortcut field
4. Press key combination (e.g., \`Control+Shift+5\`)
5. Auto-saved

**Suggested shortcuts:**
- \`Control+Shift+5\` (mirrors macOS Shift+Cmd+5) ✅
- \`Control+R\` (R for Record)
- \`Control+Shift+R\`

**Note:** You can use the shortcut even if Screen Capture is hidden from the PowerStrip.

## Screen Capture Toolbar Options

When opened, the macOS toolbar shows:

### Capture Modes
1. **Capture Entire Screen** - Full screen screenshot
2. **Capture Selected Window** - Click any window to capture it
3. **Capture Selected Portion** - Drag to select area
4. **Record Entire Screen** - Video of full screen
5. **Record Selected Portion** - Video of selected area

### Options Button
- **Save to:** Desktop, Documents, Clipboard, Mail, Messages, Preview
- **Timer:** None, 5 seconds, 10 seconds
- **Show Mouse Pointer in recording:** On/Off
- **Remember Last Selection:** On/Off
- **Show Floating Thumbnail:** On/Off

### Capture Button
Click to start capture/recording

### Close Button
Dismiss toolbar without capturing

## Difference: Screen Capture vs Snipping Tool

Berri has two screenshot-related modules:

| Feature | Snipping Tool | Screen Capture |
|---------|---------------|----------------|
| **Purpose** | Quick selection screenshots | Advanced capture & recording |
| **Interface** | Minimal (just selection) | Full macOS toolbar |
| **Video recording** | ❌ No | ✅ Yes |
| **Window capture** | ❌ No | ✅ Yes |
| **Timer** | ❌ No | ✅ Yes (5s, 10s) |
| **Save options** | Auto-save only | Desktop, Clipboard, Mail, etc. |
| **Best for** | 90% of screenshots | Advanced needs, tutorials |

**When to use each:**
- **Snipping Tool:** Quick, everyday screenshots
- **Screen Capture:** Video recording, tutorials, advanced options

## Video Recording

### Recording Your Screen
1. Open Screen Capture module
2. Click "Record Entire Screen" or "Record Selected Portion"
3. Click record button (or press Enter)
4. Recording starts (after countdown if timer enabled)
5. Click stop button in menu bar when done
6. Video saved to chosen location

### Recording Tips
- **Close unnecessary apps** - Reduce background noise in recording
- **Use timer** - 5-second countdown gives you time to prepare
- **Hide Berri** - Use Control+E to hide Berri during recording (optional)
- **Show mouse pointer** - Enable in Options for tutorial videos

### Recording Limitations
- Max recording time: No limit (disk space dependent)
- File format: .mov (QuickTime)
- Quality: Retina/native resolution

## Required Permission

Requires **Screen Recording permission**:

1. System Settings → Privacy & Security → Privacy
2. Select **Screen Recording**
3. Enable **Berri**
4. Restart Berri if prompted

**Same permission as Snipping Tool** - granting once enables both.

## Troubleshooting

### Toolbar Doesn't Appear
1. Check Screen Recording permission
2. Verify shortcut is assigned
3. Try macOS native Shift+Cmd+5 (if that fails, it's macOS issue)
4. Restart Mac if persistent

### Recording Has No Audio
- macOS screen recording doesn't capture system audio by default
- Use QuickTime Player for audio recording
- Or use third-party tools (OBS, ScreenFlow)

### File Size Too Large
- .mov files can be large (500MB+ for long recordings)
- Compress with HandBrake or iMovie
- Record shorter segments
- Record selected portion (not full screen)

### Can't Find Saved Files
- Check Options → Save to location
- Default: Desktop or Screenshots folder
- Search Spotlight for recent .mov or .png files

## Example Workflows

### Tutorial Creator
1. Control+Shift+5 (Screen Capture)
2. Select "Record Selected Portion"
3. Choose app window
4. Enable mouse pointer in Options
5. Record tutorial
6. Save to Desktop
7. Upload to YouTube

### Designer
1. Screen Capture → Capture Selected Window
2. Click design tool window
3. Clean capture without other UI
4. Save to clipboard
5. Paste into presentation

## Related Features
- [Snipping Tool](/guide/feature-modules/snipping-tool) - Quick screenshots
- [Keyboard Shortcuts](/guide/interface-navigation/shortcuts) - Assign shortcuts
- [Permissions Setup](/guide/permissions-setup/screen-recording) - Grant permissions`
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
- Try **horizontal PowerStrip at screen top** for quick access
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
- Remember: Shortcuts are based on YOUR module order!

### Module Switching
- Use **Control+1-9** to jump directly to needed features
- Skip the interface navigation entirely
- Direct access maintains flow state
- Check Settings → Keyboard Shortcuts to see YOUR assignments

### Quick Toggle
- **Control+E** to hide/show when presenting or focusing
- Perfect for screen sharing scenarios
- Instant access when needed, invisible when not

## Customization Recommendations

### Start Small
- Begin with **PowerStrip view**, expand as needed
- Don't overwhelm yourself with all features at once
- Gradually incorporate more modules into your workflow
- Free plan: Start with 3-4 modules, grow to 5
- Lifetime plan: Start with 5-6 modules, grow as needed

### Personalize
- **Adjust position and size** to match your workflow
- Experiment with different orientations
- Find what works best for your specific setup
- Reorder modules to optimize shortcuts (most-used = Control+1)

### Privacy Mode
- Enable **incognito mode** for screen sharing/recording (Lifetime plan only)
- Prevents Berri from appearing in screenshots
- Professional appearance during presentations

## Module Organization

### Prioritize Your Workflow
- Put most-used module first (Control+1)
- Second-most-used module second (Control+2)
- Rarely-used modules last (or hide them)
- Review usage monthly and reorder as needed

### Free Plan Strategy (5 Modules)
- Choose your core 5 modules carefully
- Use FIFO to try new modules (oldest auto-deselects)
- Don't stress - you can always change in Settings
- Settings is always included (doesn't count)

### Lifetime Plan Strategy (12 Modules)
- Enable all modules you might use
- Hide rarely-used ones (keeps PowerStrip clean)
- Shortcuts still work even if hidden
- Experiment freely - no auto-replacement

## Advanced Workflow Patterns

### The Quick Capture Pattern
1. Assign Control+Shift+S to Snipping Tool
2. Put Clipboard on Control+2 for quick paste history
3. Use Notes on Control+1 for quick thoughts
4. Build muscle memory for rapid information capture

### The Reference Monitor Setup
- Place Berri on secondary monitor
- Keep Notes, Clipboard, or Files visible
- Use as persistent reference while working on main display

### The Presentation Mode
- Control+E to hide before presenting
- Enable incognito mode in settings (Lifetime only)
- Control+E to restore after presentation

## Productivity Maximization

### Integration with Other Apps
- Use clipboard history to move data between applications
- Screenshot features for visual documentation
- Notes for quick thoughts and reminders

### Organization Systems
- Develop consistent tagging in Notes
- Keep clipboard favorites for frequently used content
- Review and clean up regularly

## Common Mistakes to Avoid

### Don't Memorize Fixed Shortcuts
- ❌ "Control+4 is always Notes"
- ✅ "My 4th module is Notes, so Control+4 opens it"
- Shortcuts change when you reorder modules!

### Don't Ignore Module Order
- Order determines shortcuts
- Reordering changes shortcuts
- Practice new shortcuts after reordering

### Don't Hide Everything
- Hidden modules have no automatic shortcuts
- Keep frequently-used modules visible
- Only hide rarely-used modules

## Pro Tips

### Keyboard Mastery
- Learn YOUR specific Control+# assignments
- Don't assume "Notes is always Control+1"
- Check Settings → Keyboard Shortcuts regularly

### Muscle Memory
- Practice shortcuts 10-20 times after changes
- Don't reorder frequently
- Consistency builds speed

### Plan Your Setup
- Free plan: Choose wisely (only 5 modules)
- Lifetime plan: Enable many, hide unused
- Both: Put most-used modules first`
      },
      {
        id: 'troubleshooting',
        slug: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common issues and their solutions',
        category: 'advanced-usage',
        readingTime: 6,
        content: `# Troubleshooting

## Common Issues

### Shortcuts Not Working
**Problem**: Global keyboard shortcuts (Control+E, Control+1-9) don't respond

**Solutions**:
- Check **Accessibility permissions** in System Settings
- Go to System Settings → Privacy & Security → Accessibility
- Ensure Berri is listed and enabled
- Restart Berri after granting permissions
- Verify module is visible (hidden modules need manual shortcut assignment)
- Check Settings → Keyboard Shortcuts to see current assignments

### Wrong Module Opening with Shortcut
**Problem**: Control+1 opens Clipboard, but I expected Notes

**This is NOT a bug** - Shortcuts are based on module order!

**Solutions**:
- Go to Settings → PowerStrip Customization
- Check your module order (top-to-bottom or left-to-right)
- First visible module = Control+1, second = Control+2, etc.
- To change: Reorder modules by dragging
- Remember: Reordering changes shortcuts!

### Screenshots Failing
**Problem**: Screenshot shortcut not working or screenshots appear blank

**Solutions**:
- Verify **Screen Recording permission** is granted
- System Settings → Privacy & Security → Screen Recording
- Check that Berri is enabled in the list
- If using Snipping Tool, ensure you've assigned it a keyboard shortcut (no default)
- If using Screen Capture, ensure you've assigned it a keyboard shortcut (no default)
- Both tools are hidden by default - enable in Settings → PowerStrip Customization

### Files Not Loading
**Problem**: File module shows empty or can't access Desktop/Downloads

**Solutions**:
- Ensure **Full Disk Access permission** is enabled
- System Settings → Privacy & Security → Full Disk Access
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
- Close unused websites in Website Quick Access
- Hide unused modules to reduce memory footprint
- Check available system memory
- Consider reducing number of visible items

### Can't Add More Modules (Free Plan)
**Problem**: Hit 5 module limit

**This is normal for Free plan!**

**Solutions**:
- Try adding anyway - FIFO will auto-deselect oldest module
- Manually deselect a module first
- Upgrade to Lifetime for 12 modules
- Remember: Settings doesn't count toward the limit

### Module Disappeared After Adding New One (Free Plan)
**Problem**: Added a 6th module, now oldest module is gone

**This is FIFO auto-replacement** - working as designed!

**Explanation**:
- Free plan: 5 module limit
- When you add 6th, oldest is auto-removed
- No error message - smooth experience
- You can re-add the old module (will remove a different one)

**Solutions**:
- Manually manage your 5 modules
- Or upgrade to Lifetime for 12 modules

### Can't Remove Settings Module
**Problem**: Settings can't be hidden or removed

**This is intentional** - Settings is required!

**Explanation**:
- Settings is always visible (yellow lock icon during onboarding)
- Cannot be hidden or removed
- Doesn't count toward module limit
- Access via gear icon or manually assigned shortcut

## Permission Issues

### Permission Denied Errors
1. **Open System Settings**
2. Go to **Privacy & Security → Privacy**
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

## Module-Specific Issues

### Snipping Tool Not Working
1. Ensure Screen Recording permission granted
2. Verify shortcut is assigned (Settings → Keyboard Shortcuts)
3. Snipping Tool has NO default shortcut - you must assign one
4. Can be hidden from PowerStrip but still work via shortcut

### Google Meet Not Appearing
1. Google Meet is hidden by default
2. Enable in Settings → PowerStrip Customization
3. Drag from Hidden to Visible modules
4. Optionally assign shortcut (Control+M recommended)

### Screen Capture Not Working
1. Ensure Screen Recording permission granted
2. Verify shortcut is assigned (Settings → Keyboard Shortcuts)
3. Screen Capture has NO default shortcut - you must assign one
4. Try macOS native Shift+Cmd+5 to test if issue is macOS-wide

### Website Won't Load (Website Quick Access)
1. Check internet connection
2. Verify URL is correct (include \`https://\`)
3. Try removing and re-adding the website
4. Check if site is accessible in regular browser

## Getting Help

### Settings Panel
- Check **Settings → Help** for common solutions
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
1. **Export your data** (notes, settings)
2. Completely uninstall Berri
3. Remove from all permission lists in System Settings
4. Download fresh copy and reinstall
5. Import your data back

### System Compatibility
- Ensure you're running a **supported macOS version**
- Check for macOS updates that might resolve compatibility issues
- Some features may not work on older macOS versions

### Network Issues
- Browse module and Website Quick Access require internet connection
- Check firewall settings if web browsing fails
- Google Meet integration requires active internet connection

## Prevention Tips
- **Keep Berri updated** for latest bug fixes
- **Don't revoke permissions** unnecessarily
- **Regular restarts** help maintain performance
- **Review Settings → Keyboard Shortcuts** after reordering modules
- **Practice new shortcuts** after customization changes

## Understanding Dynamic Shortcuts (Important!)

Many "bugs" are actually misunderstandings about how shortcuts work:

**Truth**: Shortcuts are based on module order
**Myth**: "Control+4 is always Notes"

**Example**:
- User adds Notes as 1st module → Control+1
- Later reorders: Clipboard first, Notes second
- Now: Control+1 = Clipboard, Control+2 = Notes
- User presses Control+1 expecting Notes, gets Clipboard

**Solution**: Check Settings → Keyboard Shortcuts after reordering!

Remember: Most issues are permission-related or misunderstanding dynamic shortcuts. Check permissions first, then verify your module order and shortcut assignments!`
      }
    ]
  }
]

// Helper functions for navigation
export function getAllPages(): GuidePage[] {
  return guideSections.flatMap((section) => section.pages)
}

export function getPageBySlug(category: string, slug: string): GuidePage | undefined {
  return getAllPages().find((page) => page.category === category && page.slug === slug)
}

export function getNavigationForPage(category: string, slug: string): GuideNavigation | null {
  const allPages = getAllPages()
  const currentIndex = allPages.findIndex(
    (page) => page.category === category && page.slug === slug
  )

  if (currentIndex === -1) return null

  const current = allPages[currentIndex]
  const section = guideSections.find((s) => s.id === category)!

  return {
    current,
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : undefined,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined,
    section
  }
}

export function getSectionByCategory(category: string): GuideSection | undefined {
  return guideSections.find((section) => section.id === category)
}

export function getTotalPages(): number {
  return getAllPages().length
}

export function getPageIndex(category: string, slug: string): number {
  const allPages = getAllPages()
  return allPages.findIndex((page) => page.category === category && page.slug === slug)
}
