//=============================================================================
// sMS_MoreSkillCurrencies.js
// by superMasterSword
//=============================================================================

var Imported = Imported || {};
Imported.sMS_MoreSkillCurrencies = true;

var superMasterSword = superMasterSword || {};
superMasterSword.MSC = superMasterSword.MSC || {};

/*:
 * @plugindesc v1.2 Allows you to make custom Skill Currency stats besides just
 * MP and TP.
 * @author superMasterSword
 * 
 * @param json
 * @text Use JSON
 * @desc If you use a JSON file, data will only be read from the
 * JSON, and it may be easier to implement certain extensions.
 * @type boolean
 * @on JSON
 * @off Parameters
 * @default false
 * 
 * @param jName
 * @text JSON name
 * @desc Enter the name of the JSON file without the extension.
 * Put the JSON in the data folder.
 * @type string
 * @default SkillStats
 * 
 * @param costPad
 * @text Cost Padding
 * @desc This is how many pixels there are between multiple costs.
 * If using Yanfly's Skill Core, just put a negative value.
 * @type number
 * @min -99
 * @default 4
 * 
 * @param baseStartID
 * @text Base Stat Starting ID
 * @desc The id the new max stats will start at. If using other
 * plugins that add new stats, set this above the highest id.
 * @type number
 * @min 8
 * @default 8
 * 
 * @param subRate
 * @text Subclass Max Stat Rate
 * @desc This is the rate of the Subclass max stat that is added when
 * using Yanfly's Subclass plugin.
 * @type number
 * @decimals 3
 * @default 0.10
 * 
 * @param extraStartID
 * @text Extra Param Starting ID
 * @desc The id the new regeneration stats will start at. If adding
 * Extra Parameters, set this above the highest id.
 * @type number
 * @min 10
 * @default 10
 * 
 * @param regenFormat
 * @text Regen Rate Name
 * @desc This determines the name of the regeneration rate Special
 * Parameter for each custom stat. %1 = Stat name
 * @type string
 * @default %1rg
 * 
 * @param customEffect
 * @text Effect ID
 * @desc This is the id of the effect used to restore or decrease a
 * resource when used by a skill or item.
 * @type number
 * @min 14
 * @default 14
 * 
 * @param uGaugeMax
 * @text Unlimited Gauge Max
 * @desc This value serves as a threshold for when the gauge appears
 * full. If the stat is bigger the gauge will appear full.
 * @type number
 * @min 1
 * @default 100
 * 
 * @param crisisHpOp
 * @text Crisis HP Mode
 * @desc Rate = percentage. Amount = number. When HP is below this
 * rate or amount, "Crisis" regeneration will occur.
 * @type select
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default RATE
 * 
 * @param crisisHp
 * @text Crisis HP
 * @desc This is the rate/amount that is considered to be low HP.
 * @type number
 * @decimals 3
 * @default 0.20
 * 
 * @param crisisMpOp
 * @text Crisis MP Mode
 * @desc Rate = percentage. Amount = number. When MP is below this
 * rate or amount, "Crisis" regeneration will occur.
 * @type select
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default RATE
 * 
 * @param crisisMp
 * @text Crisis MP
 * @desc This is the rate/amount that is considered to be low MP.
 * @type number
 * @decimals 3
 * @default 0.20
 * 
 * @param superchgOp
 * @text Supercharge Mode
 * @desc Rate = percentage. Amount = number. When TP is above this
 * rate or amount, "Supercharged" regeneration will occur.
 * @type select
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default RATE
 * 
 * @param superchgTp
 * @text Supercharged TP
 * @desc This is the rate/amount that is considered to be high TP.
 * @type number
 * @decimals 3
 * @default 0.80
 * 
 * @param stats
 * @text Stats
 * @desc Define your stat(s) here
 * @type struct<stat>[]
 * @default []
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This plugin lets you create more stats for skills to use as costs.
 * Although they can be used for other purposes with some coding knowledge.
 * 
 * ============================================================================
 * Setting them up
 * ============================================================================
 * 
 * At first glance it may look daunting but once you understand what each
 * parameter does, it is actually pretty simple.
 * 
 * Name:
 *        The name parameter is what you would put in script calls or damage
 *        formulas to access the stat's value. Just like a.hp or a.atk.
 *        It must be unique, you cannot have two different stats with the same
 *        name. You should also try to keep it at three letters, although if
 *        you are going to have a corresponding maximum stat, you may want to
 *        keep it at 2 characters long. It should also be lowercase.
 * 
 * Display Name: 
 *        This is what will show up by the gauges that tell you how much of
 *        this resource you currently have.
 * 
 * Full Name:
 *        If you're not using Yanfly's Battle Engine Core or a similar plugin
 *        to make the Battle Log show less, this is what will show up to tell
 *        you how much of this resource you have gained or lost.
 *        Even if you're not using Battle Log messages, you may want to enter
 *        this just to remind yourself what this is supposed to be conceptually
 *        while setting this up.
 * 
 * Max Stat Name:
 *        This is similar to the name but is used to reference and determine 
 *        the maximum this stat can be at for the actor. Follow same naming
 *        guidelines as the name, although this is generally just the name 
 *        with an 'm' before it. Ex. mhp  mmp
 *        * If you do not want this stat to have a maximum, just leave this
 *          blank.
 * 
 * Max Stat Display Name:
 *        The Display Name for the Maximum stat, except instead of appearing
 *        by the gauge, it will say this in the status screen.
 *        * You must use a different plugin to modify the status screen and
 *          show your new stat.
 * 
 * Use Formula:
 *        If you are using Hime's Parameter Tables plugin, set this to Use
 *        Tables, (this is why you would have to know the id). Keep in mind
 *        enemies will still use the formula regardless of this setting unless
 *        you're using Hime's Enemy Classes Parameter Tables plugin. If you
 *        want to use a formula regardless of having Hime's Parameter Tables
 *        plugin enabled, set this to true. If you don't have Hime's
 *        Parameter Tables plugin enabled, you can ignore this parameter.
 *        Place this plugin underneath Parameter Tables if you're using it.
 * 
 * Formula:
 *        This is the default formula used to determine the max stat's value.
 *        (If enabled) This formula will also be used for enemies so either
 *        don't use levels or add in some checks so it doesn't crash everytime
 *        you start a battle (unless you're using another plugin to give them
 *        levels)
 * 
 * Start at Maximum:
 *       If you are using a maximum stat and this is true, this stat will start
 *       at the value of the maximum stat like MP. Otherwise it will start at
 *       0 like TP.
 * 
 * Recover All:
 *       If you are using a maximum stat and this is true, Recover All event
 *       commands will restore this stat to full, otherwise, it will not be
 *       affected.
 * 
 * Format:
 *        The parameter description should be sufficient enough, but %1 will
 *        be replaced with the cost of the skill and %2 will be replaced with
 *        the name of the resource (as set in Stat's Display Name).
 * 
 * Font Size:
 *        Adjust the font size that the skill cost shows up in on the skill
 *        list window. The engine default is 28, but Yanfly's is 20.
 * 
 * Text Color:
 *        This is the color from the windowskin (colors used in the \c[] code)
 *        that the cost will be displayed in.
 * 
 * Icon:
 *        This is the icon that will be displayed alongside costs of this type,
 *        mostly included for uniformity since Yanfly's Skill Core allows 
 *        icons and many people will likely be using that.
 * 
 * Gauge Colors:
 *        These are the colors of the gauge for this stat, it is a gradient 
 *        from the first color to the second. The colors are text colors.
 *        * Note: This plugin provides functions for drawing the gauges.
 *                However, by itself it will not draw gauges in any scenes
 *                automatically, you must use another plugin or script it
 *                yourself for that.
 * 
 * Preserve:
 *       If true this stat will be carried from battle to battle.
 *       If false this stat will be reset at the end of a battle.
 * 
 * Automatic Gain Formulas:
 *       Most of these are self-explanatory or at least simple enough to be
 *       explained in the parameter description, so there won't be a detailed
 *       listing of them all here. The variables you can use in these are:
 *       - value: this is how much the actor or enemy will gain as a result 
 *         of this action.
 *       - this: The current actor or enemy who is gaining the resource.
 *       - user, subject, attacker, a: These refer to the person using the
 *         action if applicable, otherwise they simply refer to this.
 *       - target: This refers to the target of the current action, or this.
 *       - s, v: This is an array of all the Switches or Variables respectively,
 *         however, they may not be defined yet if not accessed prior with
 *         the value or setValue methods so you may want to add checks.
 *       In addition, certain formulas may have the value variable preset to
 *       something so be sure to read the parameter description.
 * 
 * Regen formula:
 *       This is the formula for how much will be regenerated (if any
 *       regeneration is added through notetags)
 *       You should replace the underscores with the name of your stat.
 *       The default formula will just give you the amount of that resource
 *       equivalent to the current percentage of the maximum.
 *       Or, 50% regen = 50% maxValue (if one) gained.
 *       If there is no maximum it will give you that percentage exactly.
 *       Or, 50% regen = 50 stat restored.
 *       You can delete the irrelevant part of the equation, (100 if you're
 *       using a maximum, user.m___ if you're not)
 *       In most cases you'll probably want to keep this how it is but if you
 *       do for whatever reason wish to change the formula the option is there.
 *  
 * Deal/Gain State formula:
 *       These will be ran when an enemy gives an actor a state or vice versa.
 *       For the most part works just like the corresponding formulas in
 *       Yanfly's Enhanced TP plugin except the value variable will initially
 *       be set to the id of the state so you can set more specific effects if
 *       you so desire.
 * 
 * Crisis and Supercharged formulas:
 *       Do exactly as you'd think. The formulas are evaluated separately and
 *       will add the final values together with the default regeneration when
 *       the actual regeneration occurs.
 * 
 * Extra Crises:
 *       This is so you can have your new custom resources influence your other
 *       new custom resources! These will activate when the specified resource
 *       is under a certain rate (you can not use custom resources without a
 *       maximum as there is then no maximum to compare them to) or amount.
 *       - Name:
 *           Simply put the name you put in the corresponding stat's name
 *           parameter.
 *       - Mode:
 *           Choose an option to decide whether this stat has to be below a
 *           certain rate or amount to cause the current stat to increase (or
 *           decrease depending on how you write the formula) upon regeneration.
 *           Also, do not use rates for stats that have no maximum.
 *       - Rate/Amount:
 *           This is the rate or amount (depending on the setting above) below
 *           which regeneration will activate. If multiple of the stats are low
 *           enough to activate regeneration then all of their formulas will be
 *           evaluated and have a cumulative effect.
 *       - Formula:
 *           This is the formula that will be evaluated to determine the amount
 *           of the current stat gained.
 * 
 * Extra Supercharged:
 *       These are practically the same as Crises, except they are activated
 *       when ABOVE the specified rate or amount instead of below. Other than
 *       that, they are specified the same way.
 * 
 * Battle Log Terms:
 *       So if by some miracle you're one of the rare people not using Yanfly's
 *       Battle Engine Core (or some other plugin) to make the Battle Log be
 *       simplified, first of all, props to you! Second, specify the messages
 *       that you want to show up in the Battle Log here. To use ones already
 *       set up in the database (ex: Actor Gain and Enemy Gain) simply put in
 *       the term provided, otherwise, enter in the custom message you want to
 *       be displayed, with the %# with # being a number designating what to
 *       replace the percent with.
 *       If you do not want any text to show up at all, leave this blank.
 * 
 * ============================================================================
 * Notetags
 * ============================================================================
 * 
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 * 
 *   <MaxStat Plus: +x>
 *   <MaxStat Plus: -x>
 *   Replace 'MaxStat' with the name of the maximum stat you wish to add to.
 *   This is applied before the rate modifier.
 * 
 *   <MaxStat Rate: x%>
 *   <MaxStat Rate: x.y>
 *   Replace 'MaxStat' with the name of the maximum stat you wish to change the
 *   rate of. Applied after the Plus modifier.
 * 
 *   <stat Regen: +x%>
 *   <stat Regen: -x%>
 *   <stat Regen: +x.y>
 *   <stat Regen: -x.y>
 *   Replace 'stat' with the name of the regeneration stat you want to add to.
 * 
 * Class and Enemy Notetag:
 * 
 *   <Custom MaxStat Formula>
 *    code
 *    code
 *   </Custom MaxStat Formula>
 *   Replace 'MaxStat' with the name of the maximum stat you wish to calculate.
 *   If this notetag is used this formula will be used instead of the default
 *   one specified in the parameters. Set the value variable to the maximum
 *   stat's base value. (Base means it is before the plus and rate modifers
 *   are applied)
 * 
 * Skill and Item Notetag:
 * 
 *   <Restore stat: x%, y>
 *   Replace stat with the name of the stat/resource you want this skill/item
 *   to restore. Replace x with the percentage you want to restore, and y with
 *   the flat amount. Values can be negative or zero if you don't want it to
 *   increase by percentage or flat respectively.
 * 
 * Skill Notetags:
 * 
 *   <stat Cost: x>
 *   Replace stat with the name of the stat/resource you want this skill to
 *   require to be used. x is the required amount.
 * 
 *   <stat Cost: x%>
 *   Replace stat with the name of the stat/resource you want this skill to
 *   require to be used. It will cost x% of their maximum. Do not use this
 *   tag for limitless resources.
 * 
 *   <stat Cost Eval>
 *    code
 *    code
 *   </stat Cost Eval>
 *   Replace stat with the name of the stat/resource you want this skill to
 *   require to be used. This will evaluate Javascript code to determine the
 *   custom stat cost. There is a 'cost' variable already set to the existing 
 *   cost, change that to the desired cost, or do whatever you wish to do with
 *   the cost value.
 *   
 * 
 * Item Notetags:
 * 
 *   <Grow MaxStat: +x>
 *   <Grow MaxStat: -x>
 *   Replace 'MaxStat' with the name of the maximum stat you wish to increase.
 *   This will permanently increase or decrease the 'Plus' of that maximum stat
 *   by this amount.
 * 
 * If you are confused about what the 'Plus' and 'Rate' means, see one of 
 * Yanfly's Parameter Plugins for reference. And no, his Parameter Plugins are
 * not required.
 * 
 * ============================================================================
 * Compatibility
 * ============================================================================
 * 
 * Place this plugin below Yanfly's Core plugins (specifically his Parameter
 * Control plugins) and Hime's Parameter Tables, and above Yanfly's Skill Core*
 * and Jay's Dualtechs if you're using any of those.
 * This plugin is also compatible with Moogle_X's Traits Extension Bundle and
 * Mjshi's PrettySleekGauges but it doesn't matter where you place them in
 * relation to this plugin.
 * 
 * *Yanfly's Skill Core requires a compatibility patch.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * 1.2.1 - Changed how regens are handled so I'm not a liar in the help file.
 *         (Before it would add each regen calculation separately)
 * 
 * 1.2.0 - Overhauled backend code to use a common method instead of making a
 *         for loop everytime something needs to be done for every stat. Should
 *         hopefully also make extensions, alterations, and user code simpler
 *         with less plugin conflicts. Also provided methods for finding a stat
 *         from its corresponding max stat's param id and finding max param ids
 *         from the name of their max stat. Also added PrettySleekGauges
 *         compatibility.
 * 
 * 1.1.0 - MV 1.5 update, updated parameters to utilize new features. Made
 *         massively more user friendly, no longer requires a json to have
 *         unlimited stats.
 
 * 1.0.0 - Finished plugin!
*/

/*~struct~stat:
 * 
 * @param name
 * @text Stat Name
 * @desc This is what you will use in damage formulas and script
 * calls. Make sure it's unique. Generally lowercase.
 * @type string
 * 
 * @param displayName
 * @text Stat Display Name
 * @parent name
 * @desc This is what will appear by gauges in menus.
 * Usually just the name capitalized.
 * @type string
 * 
 * @param fullName
 * @text Stat Full Name
 * @parent name
 * @desc This is what will appear in the battle log if you're not
 * using a plugin to make it show less.
 * @type string
 * 
 * @param max
 * @text Max Stat Name
 * @desc Determine the max of this resource you can have at a time.
 * Leave blank for no max. Same naming rules apply.
 * @type string
 * 
 * @param maxDisplayName
 * @text Max Stat Display Name
 * @parent max
 * @desc This should be self-explanatory.
 * @type string
 * 
 * @param useMaxFormula
 * @text Max Stat Use Formula
 * @parent max
 * @desc Ignore unless using Hime's Parameter Tables plugin.
 * @type boolean
 * @on Use Formula
 * @off Use Tables
 * @default false
 * 
 * @param maxFormula
 * @text Max Stat Formula
 * @parent useMaxFormula
 * @desc Set value to Max Stat's value. Enemies also use this
 * formula. Check the help file for variables you can use.
 * @type note
 * @default "value = 0;"
 * 
 * @param init
 * @text Start at Maximum
 * @parent max
 * @desc If true this stat will begin maxed when an actor or enemy
 * is initialized. Ignore this if there is no maximum stat.
 * @type boolean
 * @on Start Full
 * @off Start Empty (0)
 * @default true
 * 
 * @param recoverAll
 * @text Recover All
 * @parent max
 * @desc Determines how the Recover All event command affects this
 * stat. Ignore if there is no maximum.
 * @type boolean
 * @on Restore to max
 * @off No change
 * @default true
 * 
 * @param costDisplay
 * @text Cost Display
 * 
 * @param format
 * @text Stat Format
 * @parent costDisplay
 * @desc This is how the cost is displayed in the skill list window.
 *              %1 = cost      %2 = Stat Display Name
 * @type string
 * @default %1%2
 * 
 * @param fontSize
 * @text Font Size
 * @parent costDisplay
 * @desc Adjusts font size used to display costs of this type.
 * RM Default: 28   Yanfly's Default: 20
 * @type number
 * @default 20
 *
 * @param txtColor
 * @text Text Color
 * @parent costDisplay
 * @desc This is the text color from the window skin used for this
 * cost.
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * 
 * @param icon
 * @text Icon
 * @parent costDisplay
 * @desc This is the icon used to represent costs of this type. Use 0
 * to have no icon displayed.
 * @type number
 * @default 0
 * 
 * @param gaugeColor1
 * @text Gauge Color 1
 * @desc This is the color the beginning of the gauge's gradient will
 * be. Uses text colors.
 * @type number
 * @min 0
 * @max 31
 * @default
 * 
 * @param gaugeColor2
 * @text Gauge Color 2
 * @parent gaugeColor1
 * @desc This is the color the end of the gauge's gradient will be.
 * Uses text colors.
 * @type number
 * @min 0
 * @max 31
 * @default
 * 
 * @param preserve
 * @text Preserve Stat
 * @desc If true this resource will be consistent from battle to
 * battle. If false it will reset once the battle ends.
 * @type boolean
 * @on Preserve stat
 * @off Reset after Battle
 * @default true
 * 
 * @param formulas
 * @text Formulas
 * @desc These formulas control how much of this stat a fighter gains
 * in certain situations.
 * 
 * @param initBattle
 * @text Initiate Battle
 * @parent formulas
 * @desc Formula for how much of this resource is gained at the start
 * of a battle.
 * @type note
 * @default "value = 0;"
 * 
 * @param regen
 * @text Regeneration
 * @parent formulas
 * @desc Formula for how much of this resource is gained by
 * regeneration.
 * @type note
 * @default "value = (user.m___ || 100) * user.___rg;"
 * 
 * @param takeHpDmg
 * @text Take HP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon taking
 * HP damage. value is equal to how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param dealHpDmg
 * @text Deal HP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained dealing HP
 * damage. value is equal to how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param healHpDmg
 * @text Heal HP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained healing HP
 * damage. value is equal to the healing amount.
 * @type note
 * @default "value = 0;"
 * 
 * @param allyHpDmg
 * @text Ally HP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon allies
 * taking damage. value is equal how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param takeMpDmg
 * @text Take MP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon taking
 * MP damage. value is equal to how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param dealMpDmg
 * @text Deal MP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained dealing MP
 * damage. value is equal to how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param healMpDmg
 * @text Heal MP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained healing MP
 * damage. value is equal to the healing amount.
 * @type note
 * @default "value = 0;"
 * 
 * @param allyMpDmg
 * @text Ally MP DMG
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon allies
 * taking damage. value is equal to how much damage was dealt.
 * @type note
 * @default "value = 0;"
 * 
 * @param dealState
 * @text Inflict State
 * @parent formulas
 * @desc Formula for how much of this resource is gained inflicting
 * states on a foe. value = state id.
 * @type note
 * @default "value = 0;"
 * 
 * @param gainState
 * @text Gain State
 * @parent formulas
 * @desc Formula for how much of this resource is gained when user
 * gains a state from a foe. value = state id.
 * @type note
 * @default "value = 0;"
 * 
 * @param allyDeath
 * @text Ally Death
 * @parent formulas
 * @desc Formula for how much of this resource is gained when an ally
 * dies. target is equal to the ally that died.
 * @type note
 * @default "value = 0;"
 * 
 * @param enemyDeath
 * @text Enemy Death
 * @parent formulas
 * @desc Formula for how much of this resource is gained when an
 * enemy dies. target is equal to the enemy that died.
 * @type note
 * @default "value = 0;"
 * 
 * @param winBattle
 * @text Win Battle
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon winning
 * a battle.
 * @type note
 * @default "value = 0;"
 * 
 * @param fleeBattle
 * @text Flee Battle
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon fleeing
 * from a battle.
 * @type note
 * @default "value = 0;"
 * 
 * @param loseBattle
 * @text Lose Battle
 * @parent formulas
 * @desc Formula for how much of this resource is gained upon losing
 * a battle.
 * @type note
 * @default "value = 0;"
 * 
 * @param crisisHp
 * @text Crisis HP
 * @parent formulas
 * @desc Formula for how much of this resource is regenerated while
 * at crisis HP.
 * @type note
 * @default "value = 0;"
 * 
 * @param crisisMp
 * @text Crisis MP
 * @parent formulas
 * @desc Formula for how much of this resource is regenerated while
 * at crisis MP.
 * @type note
 * @default "value = 0;"
 * 
 * @param superchgTp
 * @text Supercharged TP
 * @parent formulas
 * @desc Formula for how much of this resource is regenerated while
 * TP is supercharged.
 * @type note
 * @default "value = 0;"
 * 
 * @param exCrises
 * @text Custom Crises
 * @parent formulas
 * @desc You can use these to allow your custom stats to cause this
 * stat to regenerate when they are below a certain amount.
 * @type struct<exCrisis>[]
 * @default []
 * 
 * @param exCrisesDefaults
 * @text Defaults
 * @parent exCrises
 * @desc These are the defaults that will be applied to your custom
 * crises if you don't specify an option.
 * 
 * @param exCrisesMode
 * @text Default Mode
 * @parent exCrisesDefaults
 * @desc Determines if the extra resources will be considered in
 * crisis at a certain rate or set amount.
 * @type select
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default RATE
 * 
 * @param exCrisesTrigger
 * @text Default Activation
 * @parent exCrisesDefaults
 * @desc The rate or amount that the resources are considered low.
 * @type number
 * @decimals 3
 * @default 0.20
 * 
 * @param exCrisesFormula
 * @text Default Formula
 * @parent exCrisesDefaults
 * @desc Put the formula you want the custom resources to use here.
 * @type note
 * @default "value = 0;"
 * 
 * @param exSupercharges
 * @text Custom Supercharges
 * @parent formulas
 * @desc You can use these to allow your custom stats to cause this
 * stat to regenerate when they are above a certain amount.
 * @type struct<exSupercharge>[]
 * @default []
 * 
 * @param exSuperchgDefaults
 * @text Defaults
 * @parent exSupercharges
 * @desc These are the defaults that will be applied to your custom
 * supercharges if you don't specify an option.
 * 
 * @param exSuperchgMode
 * @text Default Mode
 * @parent exSuperchgDefaults
 * @desc Determines if extra resources will be considered
 * supercharged at a certain rate or set amount.
 * @type select
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default RATE
 * 
 * @param exSuperchgTrigger
 * @text Default Activation
 * @parent exSuperchgDefaults
 * @desc The rate or amount that the resources are considered high.
 * @type number
 * @decimals 3
 * @default 0.80
 * 
 * @param exSuperchgFormula
 * @text Default Formula
 * @parent exSuperchgDefaults
 * @desc Put the formula you want the custom resources to use here.
 * @type note
 * @default "value = 0;"
 * 
 * @param onlyMember
 * @text Only Member
 * @parent formulas
 * @desc Formula for how much of this resource is regenerated for
 * being the only ally alive.
 * @type note
 * @default "value = 0;"
 * 
 * @param evade
 * @text Evasion
 * @parent formulas
 * @desc Formula for how much of this resource is gained for evading
 * an attack.
 * @type note
 * @default "value = 0;"
 * 
 * @param bLogTerms
 * @text Battle Log Terms
 * @desc To use Database Terms, use dropdown. To make a custom term
 * to use, type in the new message. Leave blank to disable.
 * 
 * @param restoreBLog
 * @text Stat Restore Battle Log
 * @parent bLogTerms
 * @desc Gain=Gain Terms  Recovery=Recovery Terms  Custom=New message
 * %1=Battler's Name  %2=Resource's Full Name  %3=Amount gained
 * @type combo
 * @option Gain
 * @option Recovery
 * @default Recovery
 * 
 * @param lossBLog
 * @text Stat Loss Battle Log
 * @parent bLogTerms
 * @desc    Loss = Database Loss Terms       Custom = New message
 * %1=Battler's Name  %2=Resource's Full Name  %3=Amount gained
 * @type combo
 * @option Loss
 * @default Loss
*/

/*~struct~exCrisis:
 * 
 * @param stat
 * @text Stat Name
 * @desc This is the name of the custom stat.
 * @type string
 * 
 * @param mode
 * @text Mode
 * @desc Determines if the extra resource will be considered in
 * crisis at a certain rate or set amount.
 * @type select
 * @option Default
 * @value DEF
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default DEF
 * 
 * @param trigger
 * @text Activation Limit
 * @desc The rate or amount that the resource is considered low.
 * Leave negative to use the default.
 * @type number
 * @min -99
 * @decimals 3
 * @default -9
 * 
 * @param formula
 * @text Formula
 * @desc Put the formula you want the custom resource to use here.
 * Leave blank to use the default.
 * @type note
 * @default ""
*/

/*~struct~exSupercharge:
 * 
 * @param stat
 * @text Stat Name
 * @desc This is the name of the custom stat.
 * @type string
 * 
 * @param mode
 * @text Mode
 * @desc Determines if the extra resource will be considered
 * supercharged at a certain rate or set amount.
 * @type select
 * @option Default
 * @value DEF
 * @option Rate
 * @value RATE
 * @option Amount
 * @value AMT
 * @default DEF
 * 
 * @param trigger
 * @text Activation Limit
 * @desc The rate or amount that the resource is considered high.
 * Leave negative to use the default.
 * @type number
 * @min -99
 * @decimals 3
 * @default -9
 * 
 * @param formula
 * @text Formula
 * @desc Put the formula you want the custom resource to use here.
 * Leave blank to use the default.
 * @type note
 * @default ""
*/

var $sMSskillStats = {};
(function($) {

//=========================================================================
// Parameters
//=========================================================================
$.MSC.params = PluginManager.parameters('sMS_MoreSkillCurrencies');
$.MSC.json = eval($.MSC.params.json);
$.MSC.jsonName = $.MSC.params.jName + '.json';
$.MSC.costPadding = parseInt($.MSC.params.costPad);
$.MSC.baseStartID = parseInt($.MSC.params.baseStartID);
$.MSC.baseStatID = $.MSC.baseStartID;
$.MSC.subRate = parseFloat($.MSC.params.subRate);
$.MSC.extraStartID = parseInt($.MSC.params.extraStartID);
$.MSC.regenFormat = $.MSC.params.regenFormat;
Game_Action.EFFECT_RECOVER_CUSTOM = parseInt($.MSC.params.customEffect);
$.MSC.uGaugeMax = parseInt($.MSC.params.uGaugeMax);
$.MSC.crisisHpOp = $.MSC.params.crisisHpOp;
$.MSC.crisisHp = parseFloat($.MSC.params.crisisHp);
$.MSC.crisisMpOp = $.MSC.params.crisisMpOp;
$.MSC.crisisMp = parseFloat($.MSC.params.crisisMp);
$.MSC.superchgOp = $.MSC.params.superchgOp;
$.MSC.superchgTp = parseFloat($.MSC.params.superchgTp);
$.MSC.numStats = 0;
//=========================================================================
// Setting up Stats
//=========================================================================
if ($.MSC.json) {
	$.MSC.DataManager_loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		$.MSC.DataManager_loadDatabase.call(this);
		this.loadDataFile('$sMSskillStats', $.MSC.jsonName);
	};
} else {
	var stats = JSON.parse($.MSC.params.stats);
	for (var i = 0; i < stats.length; i++) {
		var stat = JSON.parse(stats[i]);
		$sMSskillStats[stat.name] = {
			regenId: i + $.MSC.extraStartID,
			displayName: stat.displayName,
			fullName: stat.fullName,
			max: !stat.max ? null : {
				id: $.MSC.baseStatID++,
				name: stat.max,
				displayName: stat.maxDisplayName,
				useFormula: eval(stat.useMaxFormula),
				formula: JSON.parse(stat.maxFormula),
				init: eval(stat.init),
				recoverAll: eval(stat.recoverAll)
			},
			format: stat.format,
			fontSize: parseInt(stat.fontSize),
			txtColor: parseInt(stat.txtColor),
			icon: parseInt(stat.icon),
			gaugeColor1: parseInt(stat.gaugeColor1),
			gaugeColor2: parseInt(stat.gaugeColor2),
			preserve: eval(stat.preserve),
			initBattle: JSON.parse(stat.initBattle),
			regen: JSON.parse(stat.regen),
			takeHpDmg: JSON.parse(stat.takeHpDmg),
			dealHpDmg: JSON.parse(stat.dealHpDmg),
			healHpDmg: JSON.parse(stat.healHpDmg),
			allyHpDmg: JSON.parse(stat.allyHpDmg),
			takeMpDmg: JSON.parse(stat.takeMpDmg),
			dealMpDmg: JSON.parse(stat.dealMpDmg),
			healMpDmg: JSON.parse(stat.healMpDmg),
			allyMpDmg: JSON.parse(stat.allyMpDmg),
			dealState: JSON.parse(stat.dealState),
			gainState: JSON.parse(stat.gainState),
			allyDeath: JSON.parse(stat.allyDeath),
			enemyDeath: JSON.parse(stat.enemyDeath),
			winBattle: JSON.parse(stat.winBattle),
			fleeBattle: JSON.parse(stat.fleeBattle),
			loseBattle: JSON.parse(stat.loseBattle),
			crisisHp: JSON.parse(stat.crisisHp),
			crisisMp: JSON.parse(stat.crisisMp),
			superchgTp: JSON.parse(stat.superchgTp),
			onlyMember: JSON.parse(stat.onlyMember),
			evade: JSON.parse(stat.evade),
			restoreBLog: stat.restoreBLog,
			lossBLog: stat.lossBLog
		};
		var defMode = stat.exCrisesMode;
		var defTrigger = parseFloat(stat.exCrisesTrigger);
		var defFormula = JSON.parse(stat.exCrisesFormula);
		var exCrises = JSON.parse(stat.exCrises);
		$sMSskillStats[stat.name].exCrises = {};
		for (var j = 0; j < exCrises.length; j++) {
			var exCrisis = JSON.parse(exCrises[j]);
			var mode = exCrisis.mode;
			var trigger = parseFloat(exCrisis.trigger);
			var formula = JSON.parse(exCrisis.formula);
			$sMSskillStats[stat.name].exCrises[exCrisis.stat] = {
				mode: mode !== 'DEF' ? mode : defMode,
				trigger: trigger >= 0 ? trigger : defTrigger,
				formula: formula ? formula : defFormula
			};
		}
		defMode = stat.exSuperchgMode;
		defTrigger = parseFloat(stat.exSuperchgTrigger);
		defFormula = JSON.parse(stat.exSuperchgFormula);
		var exSupercharges = JSON.parse(stat.exSupercharges);
		$sMSskillStats[stat.name].superchgs = {};
		for (var j = 0; j < exSupercharges.length; j++) {
			var exSuperchg = JSON.parse(exSupercharges[j]);
			var mode = exSuperchg.mode;
			var trigger = parseFloat(exSuperchg.trigger);
			var formula = JSON.parse(exSuperchg.formula);
			$sMSskillStats[stat.name].superchgs[exSuperchg.stat] = {
				mode: mode !== 'DEF' ? mode : defMode,
				trigger: trigger >= 0 ? trigger : defTrigger,
				formula: formula ? formula : defFormula
			};
		}
	}
} // ($.MSC.json)

//=========================================================================
// superMasterSword
//=========================================================================

$.defineSkillStats = function() {
	var stats = {};
	for (var stat in $sMSskillStats) {
		eval('stats.'+stat+'={get:function(){return this._'+stat+';},configurable:true};');
		var name = $.MSC.regenFormat.format(stat);
		var id = $sMSskillStats[stat].regenId;
		eval('stats.'+name+'={get:function(){return this.xparam('+id+');},configurable:true};');
		if ($sMSskillStats[stat].max) {
			name = $sMSskillStats[stat].max.name;
			id = $sMSskillStats[stat].max.id;
			eval('stats.'+name+'={get:function(){return this.param('+id+');},configurable:true};');
			if ($.MSC.json) $.MSC.baseStatID++;
		}
		$.MSC.numStats++;
	}
	Object.defineProperties(Game_BattlerBase.prototype, stats);
};

$.processMSCnotetags1 = function(group, isEquip) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		if (!Imported.YEP_BaseParamControl || isEquip) {
			obj.params = obj.params || [];
			for (var l = $.MSC.baseStartID; l < $.MSC.baseStatID; l++) {
				obj.params[l] = 0;
			}
		}
		if (Imported.YEP_BaseParamControl) {
			for (var l = $.MSC.baseStartID; l < $.MSC.baseStatID; l++) {
				obj.plusParams[l] = 0;
				obj.rateParams[l] = 1;
				obj.flatParams[l] = 0;
			}
		}
		if (Imported.YEP_ExtraParamFormula) {
			var finalId = $.MSC.extraStartID + $.MSC.numStats;
			for (var l = $.MSC.extraStartID; l < finalId; l++) {
				obj.plusXParams[l] = 0;
				obj.rateXParams[l] = 1;
				obj.flatXParams[l] = 0;
			}
		}
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<(.*) PLUS:[ ]*([+\-]\d+)>/i)) {
				var stat = RegExp.$1;
				var id = $.getMSCmaxIdFromMaxName(stat);
				if (!id) continue;
				var value = parseInt(RegExp.$2);
				if (isEquip || !Imported.YEP_BaseParamControl) {
					obj.params[id] = value;
				} else {
					obj.plusParams[id] = value;
				}
			} else if (line.match(/<(.*) RATE:[ ]*(\d+)%>/i)) {
				var stat = RegExp.$1;
				var id = $.getMSCmaxIdFromMaxName(stat);
				if (!id) continue;
				var value = parseInt(RegExp.$2) * 0.01;
				var code = Game_BattlerBase.TRAIT_PARAM;
				obj.traits.push({"code":code,"dataId":id,"value":value});
			} else if (line.match(/<(.*) RATE:[ ]*(\d*\.\d+)>/i)) {
				var stat = RegExp.$1;
				var id = $.getMSCmaxIdFromMaxName(stat);
				if (!id) continue;
				var value = parseFloat(RegExp.$2);
				var code = Game_BattlerBase.TRAIT_PARAM;
				obj.traits.push({"code":code,"dataId":id,"value":value});
			} else if (line.match(/<(.*) REGEN:[ ]*([+\-]\d+)%>/i)) {
				var stat = RegExp.$1;
				if (!sMSskillStats[stat]) continue;
				var value = parseInt(RegExp.$2) * 0.01;
				var id = $sMSskillStats[stat].regenId;
				var code = Game_BattlerBase.TRAIT_XPARAM;
				obj.traits.push({"code":code,"dataId":id,"value":value});
			} else if (line.match(/<(.*) REGEN:[ ]*([+\-]\d*\.\d+)>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var value = parseFloat(RegExp.$2);
				var id = $sMSskillStats[stat].regenId;
				var code = Game_BattlerBase.TRAIT_XPARAM;
				obj.traits.push({"code":code,"dataId":id,"value":value});
			}
		}
	}
};

$.processMSCnotetags2 = function(group) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<RESTORE (.*):[ ]*(-?\d+)%,?[ ]*(-?\d+)>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var v1 = parseInt(RegExp.$2) * 0.01;
				var v2 = parseInt(RegExp.$3);
				var c = Game_Action.EFFECT_RECOVER_CUSTOM;
				obj.effects.push({"code":c,"dataId":stat,"value1":v1,"value2":v2});
			}
		}
	}
};

$.processMSCnotetags3 = function(group) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		var evalMode = '';
		obj.MSCcosts = {};
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<(.*) COST:[ ]*(\d+)%>/i)) {
				var stat = RegExp.$1;
				if (!($sMSskillStats[stat] && $sMSskillStats[stat].max)) continue;
				var value = parseInt(RegExp.$2) * 0.01;
				obj.MSCcosts[stat] = obj.MSCcosts[stat] || {percent:0,flat:0,eval:''};
				obj.MSCcosts[stat].percent = value;
			} else if (line.match(/<(.*) COST:[ ]*(\d+)>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				var value = parseInt(RegExp.$2);
				obj.MSCcosts[stat] = obj.MSCcosts[stat] || {percent:0,flat:0,eval:''};
				obj.MSCcosts[stat].flat = value;
			} else if (line.match(/<\/(?:.*) COST EVAL>/i)) {
				evalMode = '';
			} else if (line.match(/<(.*) COST EVAL>/i)) {
				var stat = RegExp.$1;
				if (!$sMSskillStats[stat]) continue;
				obj.MSCcosts[stat] = obj.MSCcosts[stat] || {percent:0,flat:0,eval:''};
				evalMode = stat;
			} else if (evalMode && $sMSskillStats[evalMode]) {
				obj.MSCcosts[evalMode].eval += line + '\n';
			}
		}
	}
};

$.processMSCnotetags4 = function(group) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<GROW (.*):[ ]*([+\-]\d+)>/i)) {
				var stat = RegExp.$1;
				var id = $.getMSCmaxIdFromMaxName(stat);
				if (!id) continue;
				var value = parseInt(RegExp.$2);
				var code = Game_Action.EFFECT_GROW;
				obj.effects.push({"code":code,"dataId":id,"value1":value,"value2":0});
			}
		}
	}
};

$.processMSCnotetags5 = function(group) {
	for (var j = 1; j < group.length; j++) {
		var obj = group[j];
		var notedata = obj.note.split(/[\r\n]+/);
		
		var evalMode = null;
		obj.MSCformulas = {};
		
		for (var l = 0; l < notedata.length; l++) {
			var line = notedata[l];
			if (line.match(/<MSC (.*) FORMULA>/i)) {
				var stat = RegExp.$1;
				var id = $.getMSCmaxIdFromMaxName(stat);
				if (!id) continue;
				evalMode = id;
				obj.MSCformulas[evalMode] = '';
			} else if (line.match(/<\/MSC (?:.*) FORMULA>/i)) {
				evalMode = null;
			} else if (evalMode) {
				obj.MSCformulas[evalMode] += line + '\n';
			}
		}
	}
};

$.getMSCstatFromMaxId = function(id) {
	for (var stat in $sMSskillStats) {
		if ($sMSskillStats[stat].max && $sMSskillStats[stat].max.id === id) {
			return stat;
		}
	}
	return null;
};

$.getMSCmaxIdFromMaxName = function(name) {
	for (var stat in $sMSskillStats) {
		if ($sMSskillStats[stat].max && $sMSskillStats[stat].max.name === name) {
			return $sMSskillStats[stat].max.id;
		}
	}
	return null;
};

$.forEachMSCstat = function(func, t) {
	var args = [];
	if (arguments.length > 2) {
		args = Array.prototype.slice.call(arguments, 2);
	}
	for (var stat in $sMSskillStats) {
		func.apply(t, [stat].concat(args));
	}
};

//=========================================================================
// DataManager
//=========================================================================
$.MSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!$.MSC.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!$.MSC._loaded) {
		$.defineSkillStats();
		$.processMSCnotetags1($dataActors, false);
		$.processMSCnotetags1($dataClasses, false);
		$.processMSCnotetags1($dataEnemies, false);
		$.processMSCnotetags1($dataWeapons, true);
		$.processMSCnotetags1($dataArmors, true);
		$.processMSCnotetags1($dataStates, false);
		$.processMSCnotetags2($dataSkills);
		$.processMSCnotetags2($dataItems);
		$.processMSCnotetags3($dataSkills);
		$.processMSCnotetags4($dataItems);
		$.processMSCnotetags5($dataClasses);
		$.processMSCnotetags5($dataEnemies);
		$.MSC._loaded = true;
	}
	return true;
};

//=========================================================================
// TextManager
//=========================================================================

$.MSC.TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
	if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
		var stat = $.getMSCstatFromMaxId(paramId);
		if (stat) {
			return $sMSskillStats[stat].max.displayName;
		}
	}
	return $.MSC.TextManager_param.call(this, paramId);
};

//=========================================================================
// BattleManager
//=========================================================================

$.MSC.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	if (result === 0) {
		$gameParty.allMembersGainMSC('winBattle');
	} else if (result === 1) {
		$gameParty.allMembersGainMSC('fleeBattle');
	} else if (result === 2) {
		$gameParty.allMembersGainMSC('loseBattle');
	}
	$.MSC.BattleManager_endBattle.call(this, result);
};

//=========================================================================
// Game_BattlerBase
//=========================================================================

$.MSC.GameBattlerBase_clearParamPlus = Game_BattlerBase.prototype.clearParamPlus;
Game_BattlerBase.prototype.clearParamPlus = function() {
	$.MSC.GameBattlerBase_clearParamPlus.call(this);
	for (var i = $.MSC.baseStartID; i < $.MSC.baseStatID; i++) {
		this._paramPlus[i] = 0;
	}
};

$.MSC.GameBattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs;
Game_BattlerBase.prototype.clearBuffs = function() {
	$.MSC.GameBattlerBase_clearBuffs.call(this);
	for (var i = $.MSC.baseStartID; i < $.MSC.baseStatID; i++) {
		this._buffs[i] = 0;
		this._buffTurns[i] = 0;
	}
};

if (Imported.YEP_BaseParamControl) {
	$.MSC.GameBattlerBase_param = Game_BattlerBase.prototype.param;
	Game_BattlerBase.prototype.param = function(paramId) {
		if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
			var value = this.paramBase(paramId) + this.paramPlus(paramId);
			return Math.max(0, Math.round(value * this.paramRate(paramId)));
		} else {
			return $.MSC.GameBattlerBase_param.call(this, paramId);
		}
	};
}

if (Imported.YEP_ExtraParamFormula) {
	$.MSC.GameBattlerBase_xparam = Game_BattlerBase.prototype.xparam;
	Game_BattlerBase.prototype.xparam = function(xparamId) {
		var finalID = $.MSC.extraStartID + $.MSC.numStats;
		if (xparamId >= $.MSC.extraStartID && xparamId < $.MSC.finalID) {
			return Yanfly.XParam.Game_BattlerBase_xparam.call(this, xparamId);
		} else {
			return $.MSC.GameBattlerBase_xparam.call(this, xparamId);
		}
	};
}

Game_BattlerBase.prototype.setMSC = function(stat, value) {
	if ($sMSskillStats[stat]) {
		this['_' + stat] = value;
		this.refresh();
	}
};

$.MSC.GameBattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
	$.MSC.GameBattlerBase_refresh.call(this);
	if ($gameTemp.MSCsetup) return;
	$.forEachMSCstat(this.MSCrefresh, this);
};

Game_BattlerBase.prototype.MSCrefresh = function(stat) {
	if (!$sMSskillStats[stat]) return;
	if ($sMSskillStats[stat].max) {
		var name = $sMSskillStats[stat].max.name;
		this['_' + stat] = this['_' + stat].clamp(0, this[name]);
	} else {
		this['_' + stat] = Math.max(0, this['_' + stat]);
	}
};

$.MSC.GameBattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
	$.MSC.GameBattlerBase_recoverAll.call(this);
	$.forEachMSCstat(this.MSCrecoverAll, this);
};

Game_BattlerBase.prototype.MSCrecoverAll = function(stat) {
	if (!$sMSskillStats[stat]) return;
	if ($sMSskillStats[stat].max && $sMSskillStats[stat].max.recoverAll) {
		this['_' + stat] = this[$sMSskillStats[stat].max.name];
	}
};

Game_BattlerBase.prototype.MSCrate = function(stat) {
	if ($sMSskillStats[stat] && $sMSskillStats[stat].max) {
		var name = $sMSskillStats[stat].max.name;
		if (this[name] > 0) {
			return this[stat] / this[name];
		}
	}
	return 0;
};

$.MSC.GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
	$.MSC.GameBattlerBase_addNewState.call(this, stateId);
	if ($gameParty.inBattle() && this.isStateAffected(stateId)) {
		if (stateId !== this.deathStateId()) {
			this.chargeMSCbyAddState(stateId);
		} else {
			this.chargeMSCbyDeath();
		}
	}
}

Game_BattlerBase.prototype.skillMSCcost = function(skill, stat) {
	if (!$sMSskillStats[stat] || !skill.MSCcosts || !skill.MSCcosts[stat])
		return 0;
	var cost = skill.MSCcosts[stat].flat;
	var user = this;
	var s = $gameSwitches._data;
	var v = $gameVariables._data;
	if ($sMSskillStats[stat].max) {
		var max = $sMSskillStats[stat].max.name;
		cost += this[max] * skill.MSCcosts[stat].percent;
	}
	try {
		eval(skill.MSCcosts[stat].eval);
	} catch (e) {
		console.log('Skill ' + skill.id + ' ' + stat + ' Cost Eval Error');
		console.log(skill.MSCcosts[stat].eval);
		console.error(e);
	}
	return Math.max(0, Math.floor(cost));
}

$.MSC.GameBattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	if (!$.MSC.GameBattlerBase_canPaySkillCost.call(this, skill)) return false;
	return this.canPaySkillMSCcost(skill);
};

Game_BattlerBase.prototype.canPaySkillMSCcost = function(skill) {
	for (var stat in skill.MSCcosts) {
		var cost = this.skillMSCcost(skill, stat);
		if (this[stat] < cost) return false;
	}
	return true;
};

$.MSC.GameBattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
	$.MSC.GameBattlerBase_paySkillCost.call(this, skill);
	this.paySkillMSCcost(skill);
};

Game_BattlerBase.prototype.paySkillMSCcost = function(skill) {
	for (var stat in skill.MSCcosts) {
		var cost = this.skillMSCcost(skill, stat);
		this['_' + stat] -= cost;
	}
}

Game_BattlerBase.prototype.skillStatEval = function(formula, user, target, value) {
	var value = value || 0;
	if (!formula) return value;
	var prevValue = value;
	var a = user || this;
	var target = target || this;
	var attacker = user || this;
	var subject = a;
	var s = $gameSwitches._data;
	var v = $gameVariables._data;
	try {
		eval(formula);
	} catch (e) {
		console.log('More Skill Currencies Formula Eval Error');
		console.log(formula);
		console.error(e);
		value = prevValue;
	}
	return Math.floor(value);
};

//=========================================================================
//Game_Battler
//=========================================================================

Game_Battler.prototype.gainMSC = function(stat, value) {
	if (!$sMSskillStats[stat] || !value) return;
	this._result[stat + 'Affected'] = true;
	this._result[stat + 'Damage'] = -value;
	this.setMSC(stat, this[stat] + value);
};

Game_Battler.prototype.gainSilentMSC = function(stat, value) {
	if (!$sMSskillStats[stat] || !value) return;
	this.setMSC(stat, this[stat] + value);
};

Game_Battler.prototype.regenerateMSC = function(stat) {
	if (!$sMSskillStats[stat]) return;
	var value = this.regularRegenMSC(stat);
	value += this.crisisRegenMSC(stat);
	value += this.superchargedRegenMSC(stat);
	value += this.onlyMemberRegenMSC(stat);
	this.gainMSC(stat, value);
};

Game_Battler.prototype.regularRegenMSC = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	var formula = $sMSskillStats[stat].regen;
	return this.skillStatEval(formula, this, this, 0);
};

Game_Battler.prototype.crisisRegenMSC = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	var value = 0;
	if (($.MSC.crisisHpOp === 'RATE' && this.hpRate() <= $.MSC.crisisHp) ||
	($.MSC.crisisHpOp === 'AMT' && this.hp <= $.MSC.crisisHp)) {
		var formula = $sMSskillStats[stat].crisisHp;
		value += this.skillStatEval(formula, this, this, 0);
	}
	if (($.MSC.crisisMpOp === 'RATE' && this.mpRate() <= $.MSC.crisisMp) ||
	($.MSC.crisisMpOp === 'AMT' && this.mp <= $.MSC.crisisMp)) {
		var formula = $sMSskillStats[stat].crisisMp;
		value += this.skillStatEval(formula, this, this, 0);
	}
	if ($sMSskillStats[stat].exCrises) {
		var exCrises = $sMSskillStats[stat].exCrises;
		for (var stat2 in exCrises) {
			if ((exCrises[stat2].mode === 'RATE' &&
			this.MSCrate(stat2) <= exCrises[stat2].trigger) ||
			(exCrises[stat2].mode === 'AMT' &&
			this[stat2] <= exCrises[stat2].trigger)) {
				var formula = exCrises[stat2].formula;
				value += this.skillStatEval(formula, this, this, 0);
			}
		}
	}
	return value;
};

Game_Battler.prototype.superchargedRegenMSC = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	var value = 0;
	if (($.MSC.superchgOp === 'RATE' && this.tpRate() >= $.MSC.superchgTp) ||
	($.MSC.superchgOp === 'AMT' && this.tp >= $.MSC.superchgTp)) {
		var formula = $sMSskillStats[stat].superchgTp;
		value += this.skillStatEval(formula, this, this, 0);
	}
	if ($sMSskillStats[stat].superchgs) {
		var superchgs = $sMSskillStats[stat].superchgs;
		for (var stat2 in superchgs) {
			if ((superchgs[stat2].mode === 'RATE' &&
			this.MSCrate(stat2) >= superchgs[stat2].trigger) ||
			(superchgs[stat2].mode === 'AMT' &&
			this[stat2] >= superchgs[stat2].trigger)) {
				var formula = superchgs[stat2].formula;
				value += this.skillStatEval(formula, this, this, 0);
			}
		}
	}
	return value;
};

Game_Battler.prototype.onlyMemberRegenMSC = function(stat) {
	if (!$sMSskillStats[stat]) return 0;
	if (this.isDead()) return 0;
	if (this.friendsUnit().aliveMembers().length > 1) return 0;
	var formula = $sMSskillStats[stat].onlyMember;
	return this.skillStatEval(formula, this, this, 0);
};

$.MSC.GameBattler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
	$.MSC.GameBattler_regenerateAll.call(this);
	if (this.isAlive()) {
		$.forEachMSCstat(this.regenerateMSC, this);
	}
};

$.MSC.GameBattler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
	$.MSC.GameBattler_onBattleStart.call(this);
	$.forEachMSCstat(this.MSConBattleStart, this);
};

Game_Battler.prototype.MSConBattleStart = function(stat) {
	if (!$sMSskillStats[stat]) return;
	var formula = $sMSskillStats[stat].initBattle;
	var value = this.skillStatEval(formula, this, this, 0);
	this.gainSilentMSC(stat, value);
};

Game_Battler.prototype.chargeMSCbyAddState = function(stateId) {
	if (Imported.sMS_Jay_DualtechExt &&
	BattleManager._phase.indexOf('action') > -1) {
		var user = BattleManager._action.attackers()[0];
	} else {
		var user = BattleManager._subject;
	}
	if (user && user.isActor() && this.isActor()) return;
	if (user && user.isEnemy() && this.isEnemy()) return;
	$.forEachMSCstat(this.MSConAddState, this, stateId, user);
};

Game_Battler.prototype.MSConAddState = function(stat, stateId, user) {
	if (!$sMSskillStats[stat]) return;
	if (user) {
		var formula = $sMSskillStats[stat].dealState;
		var value = user.skillStatEval(formula, user, this, stateId);
		user.gainSilentMSC(stat, value);
	}
	var formula = $sMSskillStats[stat].gainState;
	var value = this.skillStatEval(formula, user, this, stateId);
	this.gainSilentMSC(stat, value);
}

Game_Battler.prototype.chargeMSCbyDeath = function() {
	var members = this.friendsUnit().members();
	for (var i = 0; i < members.length; i++) {
		var ally = members[i];
		if (!ally) continue;
		if (ally === this) continue;
		$.forEachMSCstat(this.MSConAllyDeath, this, ally);
	}
	members = this.opponentsUnit().members();
	for (var i = 0; i < members.length; i++) {
		var foe = members[i];
		if (!foe) continue;
		$.forEachMSCstat(this.MSConEnemyDeath, this, foe);
	}
};

Game_Battler.prototype.MSConAllyDeath = function(stat, ally) {
	if (!$sMSskillStats[stat] || !ally) return;
	var formula = $sMSskillStats[stat].allyDeath;
	var value = ally.skillStatEval(formula, ally, this, 0);
	ally.gainSilentMSC(stat, value);
};

Game_Battler.prototype.MSConEnemyDeath = function(stat, foe) {
	if (!$sMSskillStats[stat] || !foe) return;
	var formula = $sMSskillStats[stat].enemyDeath;
	var value = foe.skillStatEval(formula, foe, this, 0);
	foe.gainSilentMSC(stat, value);
};

$.MSC.GameBattler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
	$.MSC.GameBattler_onBattleEnd.call(this);
	$.forEachMSCstat(this.MSConBattleEnd, this);
};

Game_Battler.prototype.MSConBattleEnd = function(stat) {
	if (!$sMSskillStats[stat]) return;
	if (!$sMSskillStats[stat].preserve) {
		if ($sMSskillStats[stat].max) {
			this.setMSC(stat, this[$sMSskillStats[stat].max.name]);
		} else {
			this.setMSC(stat, 0);
		}
	}
};

Game_Battler.prototype.chargeMSCbyDamage = function(stat, target, damage, type, user) {
	if (!$sMSskillStats[stat] || !$sMSskillStats[stat][type]) return;
	var formula = $sMSskillStats[stat][type];
	if (type.indexOf('take') > -1) {
		var value = this.skillStatEval(formula, target, this, damage);
	} else if (type.indexOf('ally') > -1 && user) {
		var value = this.skillStatEval(formula, user, target, damage);
	} else {
		var value = this.skillStatEval(formula, this, target, damage);
	}
	this.gainSilentMSC(stat, value);
};

Game_Battler.prototype.chargeMSCbyEvade = function(stat, user) {
	if (!$sMSskillStats[stat]) return;
	var formula = $sMSskillStats[stat].evasion;
	var value = this.skillStatEval(formula, user, this, 0);
	this.gainSilentMSC(stat, value);
}

if (!Imported.YEP_BaseParamControl) {
	Game_Battler.prototype.paramPlus = function(paramId) {
		var value = Game_BattlerBase.prototype.paramPlus.call(this, paramId);
		if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
			var states = this.states();
			for (var i = 0; i < states.length; i++) {
				if (states[i] && states[i].params) {
					value += states[i].params[paramId];
				}
			}
		}
		return value;
	};
}

//=========================================================================
// Game_Actor
//=========================================================================

$.MSC.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	$gameTemp.MSCsetup = true;
	$.MSC.GameActor_setup.call(this, actorId);
	$gameTemp.MSCsetup = undefined;
	$.forEachMSCstat(this.MSCsetup, this);
};

Game_Actor.prototype.MSCsetup = function(stat) {
	if (!$sMSskillStats[stat]) return;
	if ($sMSskillStats[stat].max && $sMSskillStats[stat].max.init) {
		this['_' + stat] = this[$sMSskillStats[stat].max.name];
	} else{
		this['_' + stat] = 0;
	}
};

$.MSC.GameActor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
	if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
		var stat = $.getMSCstatFromMaxId(paramId);
		if (stat) {
			if (Imported.TH_ParameterTables && 
			!$sMSskillStats[stat].max.useFormula) {
				return $.MSC.GameActor_paramBase.call(this, paramId);
			}
			var formula = $sMSskillStats[stat].max.formula;
			if (this.currentClass().MSCformulas &&
			this.currentClass().MSCformulas[paramId] !== undefined) {
				formula = this.currentClass().MSCformulas[paramId];
			}
			var value = this.skillStatEval(formula, this, this, 0);
			if (Imported.YEP_X_Subclass && this.subclass()) {
				if (this.subclass().MSCformulas &&
				this.subclass().MSCformulas[paramId] !== undefined) {
					formula = this.subclass().MSCformulas[paramId];
				} else {
					formula = $sMSskillStats[stat].max.formula;
				}
				var sub = this.skillStatEval(formula, this, this, 0);
				value += Math.floor(sub * $.MSC.subRate);
			}
			return value;
		}
	}
	return $.MSC.GameActor_paramBase.call(this, paramId);
};

if (!Imported.YEP_BaseParamControl) {
	$.MSC.GameActor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function(paramId) {
		var value = $.MSC.GameActor_paramPlus.call(this, paramId);
		if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
			value += this.actor().params[paramId];
			value += this.currentClass().params[paramId];
		}
		return value;
	};
}

//=========================================================================
// Game_Enemy
//=========================================================================

$.MSC.GameEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	$gameTemp.MSCsetup = true;
	$.MSC.GameEnemy_setup.call(this, enemyId, x, y);
	$gameTemp.MSCsetup = undefined;
	$.forEachMSCstat(this.MSCsetup, this);
};

Game_Enemy.prototype.MSCsetup = function(stat) {
	if (!$sMSskillStats[stat]) return;
	if ($sMSskillStats[stat].max && $sMSskillStats[stat].max.init) {
		this['_' + stat] = this[$sMSskillStats[stat].max.name];
	} else{
		this['_' + stat] = 0;
	}
};

$.MSC.GameEnemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
	if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
		var stat = $.getMSCstatFromMaxId(paramId);
		if (stat) {
			if (Imported.TH_EnemyClassesParameterTables &&
			!$sMSskillStats[stat].max.useFormula) {
				return $.MSC.GameEnemy_paramBase.call(this, paramId);
			}
			var formula = $sMSskillStats[stat].max.formula;
			if (this.enemy().MSCformulas && this.enemy().MSCformulas[paramId]) {
				formula = this.enemy().MSCformulas[paramId];
			}
			return this.skillStatEval(formula, this, this, 0);
		}
	}
	return $.MSC.GameEnemy_paramBase.call(this, paramId);
};

if (!Imported.YEP_BaseParamControl) {
	Game_Enemy.prototype.paramPlus = function(paramId) {
		var value = Game_Battler.prototype.paramPlus.call(this, paramId);
		if (paramId >= $.MSC.baseStartID && paramId < $.MSC.baseStatID) {
			value += this.enemy().params[paramId];
		}
		return value;
	};
}

//=========================================================================
// Game_Unit
//=========================================================================

Game_Unit.prototype.allMembersGainMSC = function(type) {
	var members = this.members();
	for (var i = 0; i < members.length; i++) {
		var member = members[i];
		if (member) {
			$.forEachMSCstat(this.MSCallMembersGain, this, type, member);
		}
	}
};

Game_Unit.prototype.MSCallMembersGain = function(stat, type, member) {
	if (!$sMSskillStats[stat] || !$sMSskillStats[stat][type]) return;
	if (!member) return;
	var formula = $sMSskillStats[stat][type];
	var value = member.skillStatEval(formula, member, member, 0);
	member.gainSilentMSC(stat, value);
};

//=========================================================================
// Game_Action
//=========================================================================

$.MSC.GameAction_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	$.MSC.GameAction_apply.call(this, target);
	if (!target) return;
	var result = target.result();
	if (!result) return;
	if (result.missed || result.evaded) {
		$.forEachMSCstat(target.chargeMSCbyEvade, target, this.subject());
	}
};

$.MSC.GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
	$.MSC.GameAction_executeHpDamage.call(this, target, value);
	var user = this.subject();
	if (value > 0) {
		$.forEachMSCstat(target.chargeMSCbyDamage, target, user, value, 'takeHpDmg');
		this.allyMSCgain(target, value, 'allyHpDmg');
		$.forEachMSCstat(user.chargeMSCbyDamage, user, target, value, 'dealHpDmg');
	} else if (value < 0) {
		$.forEachMSCstat(user.chargeMSCbyDamage, user, target, value, 'healHpDmg');
	}
};

$.MSC.GameAction_executeMpDamage = Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function(target, value) {
	$.MSC.GameAction_executeMpDamage.call(this, target, value);
	var user = this.subject();
	if (value > 0) {
		$.forEachMSCstat(target.chargeMSCbyDamage, target, user, value, 'takeMpDmg');
		this.allyMSCgain(target, value, 'allyMpDmg');
		$.forEachMSCstat(user.chargeMSCbyDamage, user, target, value, 'dealMpDmg');
	} else if (value < 0) {
		$.forEachMSCstat(user.chargeMSCbyDamage, user, target, value, 'healMpDmg');
	}
};

Game_Action.prototype.allyMSCgain = function(target, value, type) {
	var user = this.subject();
	var allies = target.friendsUnit().members();
	for (var i = 0; i < allies.length; i++) {
		var ally = allies[i];
		if (!ally) continue;
		if (ally === target) continue;
		$.forEachMSCstat(ally.chargeMSCbyDamage, ally, target, value, type, user);
	}
};

$.MSC.GameAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
	if (effect.code === Game_Action.EFFECT_RECOVER_CUSTOM) {
		this.itemEffectRecoverMSC(target, effect);
	} else {
		$.MSC.GameAction_applyItemEffect.call(this, target, effect);
	}
};

Game_Action.prototype.itemEffectRecoverMSC = function(target, effect) {
	var stat = effect.dataId;
	if (!$sMSskillStats[stat]) return;
	var max = 0;
	if ($sMSskillStats[stat].max) {
		max = target[$sMSskillStats[stat].max.name];
	}
	var value = max * effect.value1 + effect.value2;
	if (value > 0) value *= target.rec;
	if (this.isItem()) value *= this.subject().pha;
	if (Imported.Moogle_X_TEB && Moogle_X.TEB.catnipEffect && (tempCatnip ||
	(this.subject().isDying() && this.subject().tebCatnip()))) {
		if (value < 0) {
			value = -Moogle_X.TEB.catnipDamage;
		} else {
			value = Moogle_X.TEB.catnipDamage;
		}
		tempCatnip = true;
	}
	value = Math.floor(value);
	if (value !== 0) {
		target.gainMSC(stat, value);
		this.makeSuccess(target);
	}
};

//=========================================================================
// Game_ActionResult
//=========================================================================

$.MSC.GameActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
	$.MSC.GameActionResult_clear.call(this);
	$.forEachMSCstat(this.MSCclear, this);
};

Game_ActionResult.prototype.MSCclear = function(stat) {
	if (!$sMSskillStats[stat]) return;
	this[stat + 'Affected'] = false;
	this[stat + 'Damage'] = 0;
};

//=========================================================================
// Window_Base
//=========================================================================

Window_Base.prototype.drawActorMSC = function(stat, actor, x, y, width) {
	if (!actor) return;
	if (!$sMSskillStats[stat]) return;
	width = width || 186;
	var color1 = $sMSskillStats[stat].gaugeColor1;
	var color2 = $sMSskillStats[stat].gaugeColor2;
	if (isNaN(color1) || isNaN(color2)) return;
	color1 = this.textColor(color1);
	color2 = this.textColor(color2);
	if ($sMSskillStats[stat].max) {
		var rate = actor.MSCrate(stat);
	} else {
		var max = $.MSC.uGaugeMax;
		var rate = actor[stat] > max ? 1 : actor[stat] / max;
	}
	var text = $sMSskillStats[stat].displayName;
	if (Imported.PrettySleekGauges) {
		this.drawAnimatedGauge(x, y, width, rate, color1, color2, stat);
		var key = this.makeGaugeKey(x, y);
		if ($sMSskillStats[stat].max) {
			var max = $sMSskillStats[stat].max.name;
			this._gauges[key].setExtra(text, actor[stat], actor[max]);
		} else {
			this._gauges[key].setExtra(text, actor[stat]);
		}
	} else {
		this.drawGauge(x, y, width, rate, color1, color2);
		this.changeTextColor(this.systemColor());
		this.drawText(text, x, y, this.textWidth(text));
		if ($sMSskillStats[stat].max) {
			var max = $sMSskillStats[stat].max.name;
			this.drawCurrentAndMax(actor[stat], actor[max], x, y, width,
								   this.normalColor(), this.normalColor());
		} else {
			var amt = actor[stat];
			this.changeTextColor(this.normalColor());
			if (Imported.YEP_CoreEngine) amt = Yanfly.Util.toGroup(amt);
			this.drawText(amt, x, y, width, 'right');
		}
	}
};

//=========================================================================
// Window_SkillList
//=========================================================================

$.MSC.WindowSkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
	width = this.drawMSCcost(skill, x, y, width);
	var dw = $.MSC.WindowSkillList_drawSkillCost.call(this, skill, x, y, width);
	return dw || width;
};

Window_SkillList.prototype.drawMSCcost = function(skill, wx, wy, dw) {
	for (var stat in skill.MSCcosts) {
		var cost = this._actor.skillMSCcost(skill, stat);
		if (cost <= 0) continue;
		if ($sMSskillStats[stat].icon > 0) {
			var iw = wx + dw - Window_Base._iconWidth;
			this.drawIcon($sMSskillStats[stat].icon, iw, wy + 2);
			dw -= Window_Base._iconWidth + 2;
		}
		this.changeTextColor(this.textColor($sMSskillStats[stat].txtColor));
		var fmt = $sMSskillStats[stat].format;
		if (Imported.YEP_CoreEngine) cost = Yanfly.Util.toGroup(cost);
		var text = fmt.format(cost, $sMSskillStats[stat].displayName);
		this.contents.fontSize = $sMSskillStats[stat].fontSize;
		this.drawText(text, wx, wy, dw, 'right');
		if ($.MSC.costPadding < 0 && Imported.YEP_SkillCore) {
			var padding = Yanfly.Param.SCCCostPadding;
		} else {
			var padding = $.MSC.costPadding;
		}
		dw -= this.textWidth(text) + padding;
		this.resetFontSettings();
	}
	return dw;
};

//=========================================================================
// Window_BattleLog
//=========================================================================

$.MSC.WindowBattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
Window_BattleLog.prototype.displayDamage = function(target) {
	$.MSC.WindowBattleLog_displayDamage.call(this, target);
	if (!target) return;
	var result = target.result();
	if (!result) return;
	if (!result.missed && !result.evaded) {
		$.forEachMSCstat(this.displayMSCdamage, this, target);
	}
};

Window_BattleLog.prototype.displayMSCdamage = function(stat, target) {
	if (!$sMSskillStats[stat]) return;
	if (!target) return;
	var result = target.result();
	if (!result) return;
	if (target.isAlive() && result[stat + 'Damage'] !== 0) {
		if (result[stat + 'Damage'] < 0) {
			this.push('performRecovery', target);
		}
		var text = this.makeMSCdamageText(stat, target);
		if (text) this.push('addText', text);
	}
};

Window_BattleLog.prototype.makeMSCdamageText = function(stat, target) {
	if (!$sMSskillStats[stat]) return '';
	if (!target) return '';
	var result = target.result();
	if (!result) return '';
	var damage = result[stat + 'Damage'];
	var isActor = target.isActor();
	var fullName = $sMSskillStats[stat].fullName;
	var fmt, message;
	if (damage > 0) {
		message = $sMSskillStats[stat].lossBLog;
		if (message === '') {
			return '';
		} else if (message === 'Loss') {
			fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
			return fmt.format(target.name(), fullName, damage);
		} else {
			return message.format(target.name(), fullName, damage);
		}
	} else if (damage < 0) {
		message = $sMSskillStats[stat].restoreBLog;
		if (message === '') {
			return '';
		} else if (message === 'Gain') {
			fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
			return fmt.format(target.name(), fullName, -damage);
		} else if (message === 'Recovery') {
			fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
			return fmt.format(target.name(), fullName, -damage);
		} else {
			return message.format(target.name(), fullName, -damage);
		}
	} else {
		return '';
	}
};

})(superMasterSword);