# RMMVPlugins
This is a collection of plugins I made years ago. I probably won't be updating them, but they are posted here for anyone who wants to use or continue them.
They haven't all been thoroughly tested, so I'll group them by how much I confirmed their functionality. I'll list a brief description of each plugin and the state it's in.

Note: These plugins were nearly all designed for MV 1.5.x. A lot of these make judicious use of the 1.5+ plugin parameter UI, if you're using an older version get reeeeal comfortable with JSON (and escape coding many many layers)! Unfortunately none of these have been tested on 1.6+ so I can't guarantee they'll work, you're free to modify them though.



# Fully Tested
These plugins should have all features working perfectly (if used as intended). Everything was thoroughly tested and should be working perfectly. Expect simpler plugins here.


## sMS_DualWeaponRestriction
My first plugin. Simply put `<Dual Required>` in the notebox of a skill and that skill will require the user to dual wield. The "Required Weapons" tab of the database will be used to specify what Weapon Types the user must be wielding. There is no way to let the user have any arbitrary weapon, but you can require they be empty handed! Very simple.

## ChangeGraphic_YEP_Compatible
This is actually an old plugin by Jeneeus Guruman, full credits to them. I only slightly modified it to make it compatible with some Yanfly Core Plugins. Unfortunately I can't remember which ones, but it shouldn't have any issues with the early, major core plugins. Battle Core, Equip Core, Skill Core and the like (Item Core compatibility was added by the original author).

## ChangeGraphic_YEP_APS_Patch
A very simple patch that fixes an infinite loop with Yanfly's Auto Passive States Plugin. Interestingly, it patches a core function at a very base level, and unlike most extension plugins, I would recommend putting this near the top of your plugin list. It literally only adds in a check to see if the character is affected by a state they're immune to before attempting to remove it in `BattlerBase`'s refresh function.

## sMS_YEP_ActSeq_ExtTargetTypes
An extension for Yanfly's Battle Engine Core's Action Sequences that allows you to define your own target types! It's full "Lunatic Mode" so you'll have to be familiar with coding. Pretty much the only thing I had left to do was add more sample target types but it's fully functional. The only sample type is "Opponent(s) Not Target(s)" which can be useful for making all-target attacks that do extra damage to a chosen enemy.

## sMS_YEP_ItemCore_Ext
Inspired by Windows' context menu (the menu that shows up when you right-click) this modifies the sub-windows that appear in the Item menu when you use certain ItemCore Extensions (Attachable Augments, Item Disassemble, Item Durability, Item Rename, etc.). Rather than just overlapping the original item list, this makes the window smaller so you can partially see the original list behind it.

## sMS_MSC_YEP_SC_Patch
This is a patch to make my More Skill Currencies and Yanfly's Skill Core work together. ~~<sub>feels weird placing this above the main plugin but that's the system I chose.</sub>~~ In actuality the only thing this does by default is fix skill cost display so the custom skill currency costs will be displayed again. It also adds in support for using Skill Core to display MSC gauges, since MSC doesn't actually do that on it's own. I only made this separate so that the core plugin could go in Yanfly's "Core" section, since it felt like a fundamental addition (the Base/Extra/Special Parameter plugins go up there and this felt similar).

# Mostly/Somewhat Tested
These are plugins that should have their base/core functionality working, but some extra features may have a few kinks. Includes bigger plugins with arguably more features than they needed as well as plugins that add in mechanics that are way too complex for their own good ~~because "realism"/I wanted to code it *cough*~~


## sMS_MoreSkillCurrencies
This is the big one. This plugin, as titled, allows you to make more "skill currencies" such as MP and TP. It allows you to define extra stats that can be used as costs for skills, and provides support for providing growth/boosting of caps/max values, regeneration, adjusting how costs appear, display in the battle log, behavior at Recover All event commands, battle start/end, damage dealt/received, and more. I won't lie, this can be overwhelmingly complicated to set up. This plugin is **not** for beginners. If you're familiar with Yanfly's Enhanced TP, you'll likely find it easier. I did reference his plugin for a lot of cases where you might want to alter these values, but I tried to do my own thing. This plugin is **not** just a copy of Enhanced TP, it has very different functionality.

I tried to make this plugin compatible with as much of the YEP library as I could, though I can't guarantee compatibility with EVERY plugin. I extended the idea of Crisis regeneration by not only allowing you to choose whether it activates at a set rate or a fixed value, but also by allowing custom stats to trigger their own regeneration as well as adding in Supercharged regeneration which triggers when a stat climbs high enough. This plugin has all the base features MP and TP have to make the custom stats feel like a natural extension.

Unfortunately, I can't guarantee every feature works. There's a lot of custom formulas for different situations, and I didn't test that all trigger <sub>(though since that section referenced Yanfly most heavily it should be fine??)</sub>. Custom skill costs are definitely functional. Stats are accessible as normal, simply use battler.\[custom stat\], ex. for a stat named 'ap' call `battler.ap` where battler is a Game_Battler object. A lot of features use base engine code as a template so it should work. JSON files were never actually tested and there is no documentation on the expected fields, so you'll just have to look at the parameter parsing code to find the fields that are expected. Script calls were also never documented, so you'll have to view the source code. There are also no plugin commands added, though there really should have been. All notetags and most plugin parameters are documented thoroughly.

Fun Fact: Internally, this plugin tries to make it look like it's added features are part of the base engine, even if you won't see them in the editor. Traits and effects with custom values are added to database items. It can add stats to determine the limit of each skill currency ("max mp"), it even adds stats for regen and an Effect for skills and items!

## sMS_Jay_Dualtech_Ext
An extension plugin for Jay's Dualtechs (as the name states), this allows you to specify icons for Dualtechs, as well as 
