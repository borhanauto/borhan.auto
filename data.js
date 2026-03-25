/* ══════════════════════════════════════
   BORHAN AUTO PARTS CENTRE — data.js
   Edit this file to add/remove brands,
   models, categories and parts.
   ══════════════════════════════════════ */

const BRANDS = {
  Bajaj: {
    color: '#ff6b2b',
    emoji: '🟠',
    models: [
      'Pulsar NS160','Pulsar NS200','Pulsar 150','Pulsar 220F',
      'Avenger 150','Avenger 220','CT100','Platina 100','Discover 125','Dominar 400'
    ],
    cats: {
      Engine:       ['Piston Kit','Piston Ring Set','Cylinder Head','Valve Set','Camshaft','Crankshaft','Engine Gasket Kit','Oil Filter','Engine Oil Seal','Timing Chain'],
      Suspension:   ['Front Fork Assembly','Rear Shock Absorber','Fork Oil Seal','Fork Spring','Steering Bearing Kit','Swingarm Bush'],
      Brakes:       ['Front Brake Disc','Rear Brake Drum','Brake Pad Set','Brake Cable','Master Cylinder','Brake Lever'],
      Electrical:   ['CDI Unit','Ignition Coil','Spark Plug','Headlight Bulb','Battery','Rectifier Regulator','Stator Coil','Horn','Flasher Relay'],
      'Fuel System':['Carburetor','Fuel Tank','Fuel Cock','Air Filter','Fuel Pipe','Choke Cable'],
      Transmission: ['Drive Chain','Front Sprocket','Rear Sprocket','Chain Kit','Clutch Plate Set','Clutch Cable','Gear Shift Fork'],
      'Body Parts':  ['Front Fairing','Rear Panel','Fuel Tank Cover','Front Mudguard','Rear Mudguard','Side Panel','Seat','Headlight Visor'],
      Cooling:      ['Radiator','Water Pump','Thermostat','Coolant Reservoir','Radiator Cap']
    }
  },

  Yamaha: {
    color: '#1a5eff',
    emoji: '🔵',
    models: [
      'FZS V3','FZS V2','FZ-S Fi','R15 V4','R15 V3',
      'MT-15','Fazer FI','Saluto','YBR 125','Crux R'
    ],
    cats: {
      Engine:       ['Piston Kit','Cylinder Head','Valve Set','Camshaft','Crankshaft Bearing','Engine Gasket Set','Oil Filter','Timing Belt','Oil Pump','Rocker Arm'],
      Suspension:   ['Front Fork Set','Rear Shock Absorber','Fork Seal Kit','Steering Stem Bearing','Front Fork Oil','Rear Suspension Link'],
      Brakes:       ['Front Disc Rotor','Rear Disc Drum','Brake Pad Set','Brake Fluid','Brake Caliper','ABS Sensor'],
      Electrical:   ['CDI ECU Unit','Spark Plug','Battery','Stator Coil','Regulator Rectifier','Headlight Assembly','Turn Signal','Tail Light'],
      'Fuel System':['Fuel Injector','Carburetor','Fuel Pump','Air Filter','Fuel Tank','Air Box Assembly','Throttle Body'],
      Transmission: ['Chain Kit DID','Front Sprocket','Rear Sprocket','Clutch Disc Set','Clutch Spring','Gear Fork Set','Primary Drive Gear'],
      'Body Parts':  ['Front Cowl','Side Cowl','Rear Panel','Fuel Tank Cowl','Front Fender','Rear Fender','Side Mirrors','Seat Cowl'],
      Cooling:      ['Radiator Assembly','Coolant Hose Set','Water Pump Impeller','Thermostat Valve','Radiator Fan']
    }
  },

  Honda: {
    color: '#cc0000',
    emoji: '🔴',
    models: [
      'CB Hornet 160R','CB Shine','CB Shine SP','Livo','Dream Neo',
      'Unicorn 160','X-Blade','Navi','CB300R','CB500F'
    ],
    cats: {
      Engine:       ['Piston Kit','Cylinder Liner','Head Gasket','Valve Stem Seal','Crankshaft','Camshaft Chain','Oil Filter','Engine Mount Bolt Set','Cylinder Head Bolt','Rocker Arm Assembly'],
      Suspension:   ['Telescopic Fork','Monoshock Absorber','Fork Oil Seal','Pro-Link Bearing','Steering Cone Set','Front Axle'],
      Brakes:       ['Combi Brake System','Disc Pad','Drum Shoe','Brake Hose','Brake Switch','Caliper Piston'],
      Electrical:   ['PGM-Fi ECU','Ignition Switch','Spark Plug Iridium','Battery MF','Charging Coil','Meter Assembly','LED Headlight','Kill Switch'],
      'Fuel System':['PGM-Fi Injector','Air Cleaner','Fuel Tank','Fuel Pump Module','Throttle Body','EVAP System'],
      Transmission: ['RK Chain Kit','Sprocket Set','Clutch Friction Disc','Clutch Spring','Drive Shaft Oil Seal','Gear Shift Cam'],
      'Body Parts':  ['Front Cowl','Tank Shroud','Side Cover','Front Fender','Rear Fender','Under Cowl','Grab Rail','Windscreen'],
      Cooling:      ['Radiator','Coolant','Water Pump Body','Fan Motor','Temperature Sensor','Coolant Pipe']
    }
  },

  Suzuki: {
    color: '#003399',
    emoji: '🔵',
    models: [
      'Gixxer SF','Gixxer 155','Hayate EP','Access 125','Burgman Street',
      'GSX-S150','Bandit 150','Lets 110','Swish 125','Address 110'
    ],
    cats: {
      Engine:       ['Piston Assembly','Cylinder Kit','Head Gasket Set','Valve Assembly','Crankshaft Assy','Oil Filter Element','Engine Bolt Kit','Cam Chain Tensioner','Oil Pump Rotor','Cylinder Head Cover'],
      Suspension:   ['Front Fork Inner Tube','Rear Shock Unit','Fork Dust Seal','Linkage Bearing','Steering Head Race','Bottom Link'],
      Brakes:       ['Disc Brake Pad','Drum Brake Shoe','Brake Master Cylinder','Front Caliper Assy','Brake Lever Set','Brake Light Switch'],
      Electrical:   ['Fuel Injection ECU','Ignition Coil','NGK Spark Plug','Battery','Voltage Regulator','Combination Meter','Tail Light LED','Signal Relay'],
      'Fuel System':['Fuel Injector Assy','Air Filter Element','Fuel Tank Assy','Intake Manifold','Throttle Body Assy','Fuel Hose'],
      Transmission: ['Drive Chain Set','Sprocket Front','Sprocket Rear','Clutch Disc Kit','Clutch Cover Gasket','Transmission Oil Seal'],
      'Body Parts':  ['Headlamp Visor','Side Fairing','Rear Fender','Seat Assembly','Inner Panel','Tank Cover','Front Cowling','Foot Peg Set'],
      Cooling:      ['Radiator Assy','Coolant 1L','Radiator Hose','Water Pump Cover','Thermostat Housing']
    }
  },

  TVS: {
    color: '#f5a623',
    emoji: '🟡',
    models: [
      'Apache RTR 160 4V','Apache RTR 200 4V','Apache RR 310','Raider 125','Ntorq 125',
      'Jupiter 110','XL100','Star City Plus','Sport','Metro Plus'
    ],
    cats: {
      Engine:       ['Piston Kit','Cylinder Head Assy','Valve Seat','Timing Chain Kit','Crankshaft Bearing','Head Gasket','Oil Filter','Engine Oil Seal Set','Carburetor Jet Kit','Engine Mounting Rubber'],
      Suspension:   ['Front Fork Assembly','Rear Monoshock','Fork Seal Kit','Steering Bearing','Suspension Bush','Front Axle Nut'],
      Brakes:       ['Petal Disc Rotor','ABS Module','Brake Pad','Drum Shoes','Brake Cable Set','Hydraulic Hose','Caliper Pin'],
      Electrical:   ['RTR ECU','Racing Spark Plug','Battery MF','Stator Coil','Voltage Regulator','Digital Meter','LED DRL Strip','Horn'],
      'Fuel System':['Carb Assembly','Fuel Injector','Air Filter','Fuel Tank','Fuel Tap','Fuel Line Kit','Air Box Lid'],
      Transmission: ['Chain Kit Gold','Front Sprocket 14T','Rear Sprocket 40T','Clutch Kit','Clutch Cable','Primary Gear','Gear Shaft'],
      'Body Parts':  ['Front Fairing','Belly Pan','Tank Extensions','Rear Hugger','Front Fender','Side Panels','Pillion Grab Bar','Visor'],
      Cooling:      ['Radiator Assembly','Fan Motor','Coolant','Water Pump','Hose Clamp Set']
    }
  },

  Hero: {
    color: '#e11d48',
    emoji: '🟢',
    models: [
      'Splendor Plus','Splendor Pro','HF Deluxe','Passion Pro','Glamour',
      'Xpulse 200','Xtreme 160R','Destini 125','Maestro Edge','Pleasure Plus'
    ],
    cats: {
      Engine:       ['Piston Kit','Cylinder Kit','Cylinder Head','Valve Set','Crankshaft','Engine Gasket Set','Oil Filter','Timing Chain','Rocker Arm','Engine Oil Seal'],
      Suspension:   ['Telescopic Fork','Rear Shock Absorber','Fork Oil Seal','Bearing Set','Front Axle','Rear Axle'],
      Brakes:       ['Drum Brake Shoe','Disc Brake Pad','Brake Cable Set','Brake Lever','Brake Panel','Brake Cam'],
      Electrical:   ['CDI Module','Spark Plug','Battery','Ignition Coil','Charging Coil','Digital Meter','LED Headlight','Turn Indicator'],
      'Fuel System':['Carburetor Assy','Air Filter','Fuel Tank','Fuel Tap','Fuel Pipe','Choke Assembly','Air Box'],
      Transmission: ['Chain Kit','Front Sprocket','Rear Sprocket','Clutch Plate Set','Clutch Spring','Gear Box Kit','Primary Shaft'],
      'Body Parts':  ['Headlight Visor','Leg Shield','Side Panel','Rear Grab Rail','Front Mudguard','Rear Mudguard','Seat Foam','Fuel Tank Cap'],
      Cooling:      ['Oil Cooler','Cooling Fin Set','Temperature Switch']
    }
  }
};

const CAT_ICONS = {
  Engine:       '🔧',
  Suspension:   '🛞',
  Brakes:       '🛑',
  Electrical:   '⚡',
  'Fuel System':'⛽',
  Transmission: '⚙️',
  'Body Parts':  '🛡️',
  Cooling:      '🌡️'
};
