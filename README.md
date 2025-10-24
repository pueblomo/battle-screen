# Battle Screen - D&D Helper

A comprehensive web application designed to assist Dungeon Masters and players in managing D&D 5e encounters, monsters, and treasure generation.

## Features

### 🐉 Monster Management
- Browse and search through the complete Monster Manual bestiary
- Interactive data table with sorting and filtering capabilities
- Select monsters to add to your battleground

### ⚔️ Battleground
- Display selected monster stat blocks in a clean, organized layout
- Traditional D&D stat block styling with authentic parchment background texture
- View multiple monsters simultaneously for encounter management
- Complete stat information including abilities, actions, and special features
- **Interactive Spell System**: Hover over spell names to view spell details including:
  - Casting time, range, and level
  - Full spell description with formatted entries
  - Higher level casting effects
  - Integrated with complete D&D 5e spell database

### 💎 Treasure Generator
- Generate random treasure based on item type and rarity
- **Item Types**: Arcana, Armaments, Implements, Relics
- **Rarity Levels**: Common, Uncommon, Rare, Very Rare, Legendary
- Item rarity reference table by character level (1-4, 5-10, 11-16, 17-20)
- Roll-based treasure tables (1d100) for authentic D&D experience

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4 with custom parchment-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui
- **Data Tables**: TanStack Table with custom styling
- **Routing**: React Router 7
- **HTTP Client**: Axios with caching interceptor
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Fonts**: Libre Baskerville for authentic fantasy aesthetic

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd battle-screen
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Docker Deployment

#### Local Development

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t battle-screen .

# Run the container
docker run -p 8080:80 battle-screen
```

The application will be available at `http://localhost:8080`

#### Raspberry Pi Deployment

**Quick Deploy Script**

Use the automated deployment script (recommended):

```bash
# Make the script executable (first time only)
chmod +x deploy-to-pi.sh

# Deploy to Raspberry Pi (default port 80, user pi)
./deploy-to-pi.sh raspberrypi.local

# Specify custom port
./deploy-to-pi.sh raspberrypi.local 8080

# Specify custom user
./deploy-to-pi.sh raspberrypi.local 80 myuser

# All custom options
./deploy-to-pi.sh 192.168.1.100 8080 admin
```

**Script Arguments:**
- `[hostname]` - Pi hostname or IP (default: raspberrypi.local)
- `[port]` - HTTP port to expose (default: 80)
- `[user]` - SSH user (default: pi)

The script will build the ARM image, transfer it to your Pi, and start the container automatically.

**Option 1: Manual Build and Transfer**

Build for ARM architecture on your Mac and transfer to Raspberry Pi:

```bash
# Set up Docker buildx (one-time setup)
docker buildx create --name multiarch --use
docker buildx inspect --bootstrap

# Build for Raspberry Pi ARM64 (Pi 4, Pi 5, Pi 400, Pi 3B+ 64-bit OS)
docker buildx build --platform linux/arm64 -t battle-screen:arm64 --load .

# Save the image to a tar file
docker save battle-screen:arm64 -o battle-screen-arm64.tar

# Transfer to Raspberry Pi (replace with your Pi's IP)
scp battle-screen-arm64.tar pi@raspberrypi.local:~/

# On Raspberry Pi: Load and run the image
ssh pi@raspberrypi.local
docker load -i battle-screen-arm64.tar
docker run -d -p 80:80 --name battle-screen --restart unless-stopped battle-screen:arm64
```

**Option 2: Using Docker Hub or Registry**

```bash
# Build and push to Docker Hub (replace 'yourusername')
docker buildx build --platform linux/arm64 -t yourusername/battle-screen:latest --push .

# On Raspberry Pi: Pull and run
docker pull yourusername/battle-screen:latest
docker run -d -p 80:80 --name battle-screen --restart unless-stopped yourusername/battle-screen:latest
```

**Advanced Options:**

For older Raspberry Pi 3 with 32-bit OS, set the platform via environment variable:
```bash
PLATFORM=linux/arm/v7 ./deploy-to-pi.sh raspberrypi.local
```

## Project Structure

```
battle-screen/
├── public/              # Static assets and data files
│   ├── bestiary-mm.json # Monster Manual data
│   ├── spells.json      # Spell data
│   └── *.csv            # Treasure tables by type and rarity
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── data-table/  # Monster table components
│   │   ├── main-menu/   # Navigation menu
│   │   ├── stat-block/  # Monster stat block display
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts
│   ├── lib/             # Utility functions and types
│   ├── pages/           # Page components
│   │   ├── App.tsx      # Monsters page
│   │   ├── battleground/ # Battleground page
│   │   └── treasure/    # Treasure generator page
│   └── service/         # API and data services
└── package.json
```

## Data Sources

The application uses local data files stored in the `public/` directory:

- **Monster Data**: `bestiary-mm.json` - Complete Monster Manual bestiary (D&D 5e 2024)
- **Spell Data**: `spells.json` - Complete spell database with descriptions and mechanics
- **Treasure Tables**: CSV files organized by item type and rarity
  - Format: `{type}-{rarity}.csv` (e.g., `armaments-rare.csv`)
- **Item Rarity Reference**: `item-rarity.csv` - Level-based rarity guidelines
- **Visual Assets**: `statblockparch.jpg`, `background.png` - Themed backgrounds

## UI/UX Design

The application features a custom parchment-themed design for an authentic tabletop RPG experience:

- **Color Palette**: Warm parchment tones (#F7F3E8, #EDE5D1, #CBB994, #BBAE89)
- **Typography**: Libre Baskerville serif font for fantasy aesthetic
- **Backgrounds**: Textured parchment images for stat blocks and main background
- **Interactive Elements**: 
  - Alternating row colors in tables for readability
  - Hover states with color transitions
  - Drop shadows for depth and hierarchy
  - Visible checkboxes with contrasting borders

## Features in Detail

### Monster Selection
- Search and filter monsters by name, type, CR, etc.
- Multi-select capability with visible checkboxes to build encounters
- Persistent selection across navigation
- Sortable columns for easy organization
- Themed data table with alternating row colors and hover states
- Clear filter and selection buttons for quick resets

### Stat Block Display
- Authentic D&D 5e stat block layout with parchment texture
- Displays all monster attributes:
  - Ability scores and modifiers
  - Armor Class, Hit Points, Speed
  - Skills, Saves, Resistances, Immunities
  - Condition immunities with notes (e.g., "Charmed (with Mind Blank)")
  - Actions, Bonus Actions, Reactions, Legendary Actions
  - Spellcasting with interactive spell tooltips
  - Traits and Special Abilities
  - Challenge Rating, XP, and Proficiency Bonus

### Treasure Generation
- Dynamic table loading based on selection
- Split-view display for longer treasure lists
- Reference table for appropriate rarity by party level
- Themed table styling with alternating row colors
- Responsive layout with overflow handling

## Contributing

This is a personal DM helper tool. Feel free to fork and customize for your own campaigns!

## License

This project is for personal use. D&D 5e content is property of Wizards of the Coast.
