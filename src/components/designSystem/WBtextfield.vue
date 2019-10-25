<template>
    <div class="text-field-container" :id="id">
        <!--Filled-->
        <div :class="'mdc-text-field' + shapedClass + leftIconClass + rightIconClass"
            v-if="variant == 'filled'">
            <i class="material-icons mdc-text-field__icon" v-if="leftIcon">{{leftIcon}}</i>
            <input type="text" :id="'textfield-' +  _uid" class="mdc-text-field__input"
                :aria-controls="helperId" :aria-describedby="helperId"
                :maxlength="counter">
            <label class="mdc-floating-label" :for="'textfield-' +  _uid" v-if="label">{{label}}</label>
            <i class="material-icons mdc-text-field__icon" v-if="rightIcon">{{rightIcon}}</i>
            <div class="mdc-line-ripple"></div>
        </div>

        <!--Outlined-->
        <div :class="'mdc-text-field mdc-text-field--outlined' + shapedClass + leftIconClass + rightIconClass" 
            v-if="variant == 'outlined'">
            <i class="material-icons mdc-text-field__icon" v-if="leftIcon">{{leftIcon}}</i>
            <input type="text" :id="'textfield-' +  _uid" class="mdc-text-field__input"
                :aria-controls="helperId" :aria-describedby="helperId"
                :maxlength="counter">
            <i class="material-icons mdc-text-field__icon" v-if="rightIcon">{{rightIcon}}</i>
            <div class="mdc-notched-outline">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch" v-if="label">
                    <label for="text-field-hero-input" class="mdc-floating-label">{{label}}</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
        </div>

        <!--Full-Width-->
        <div class="mdc-text-field mdc-text-field--fullwidth" v-if="variant == 'full-width'">
        <input type="text" :id="'textfield-' +  _uid" class="mdc-text-field__input"
            :placeholder="label" :aria-label="label"
            :aria-controls="helperId" :aria-describedby="helperId"
            :maxlength="counter">
        </div>

        <!--HelperLine-->
        <div class="mdc-text-field-helper-line" v-if="helperId || counter">
            <div class="mdc-text-field-helper-text" :id="helperId" aria-hidden="true" v-if="helperText">{{helperText}}</div>
            <div class="mdc-text-field-character-counter" v-if="counter">0 / 1</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: null,
        variant: { default: 'filled' },
        label: { default: 'Textfield Label' },
        shaped: { default: false },
        leftIcon: { default: '' },
        rightIcon: { default: '' },
        helperText: { default: '' },
        counter: { default: '' }
    },
    computed: {
        shapedClass: function(){
            return this.shaped? ' mdc-shaped' : '';
        },
        leftIconClass: function(){
            return this.leftIcon? ' mdc-text-left-icon' : '';
        },
        rightIconClass: function(){
            return this.rightIcon? ' mdc-text-right-icon' : '';
        },
        helperId: function(){
            return this.helperText? 'helpertext-' + this._uid : '';
        }
    }
}
</script>

<style lang="scss">
.text-field-container{
    width: 240px;

    //fix to container
    .mdc-text-field {
        width: 100%;
    }

    //shaped
    .mdc-shaped {
        border-radius: 16px 16px 0 0;
    }

    .mdc-shaped.mdc-text-field--outlined {
        border-radius: unset;

        .mdc-text-field__input {
            padding-left: 32px;
            padding-right: 0;    
        }

        .mdc-notched-outline__leading {
            border-radius: 28px 0 0 28px;
            width: 28px;
        }

        .mdc-notched-outline__notch {
            max-width: calc(100% - 28px * 2);
        }

        .mdc-notched-outline__trailing {
            border-radius: 0 28px 28px 0;
        }
    }

    //lefticon
    @mixin field-icon {
        position: absolute;
        bottom: 16px;
        cursor: pointer;
    }

    .mdc-text-left-icon {
        .mdc-text-field__icon {
            @include field-icon;
            left: 16px;
            right: auto;
        }

        .mdc-text-field__input {
            padding-left: 48px !important;
            padding-right: 16px !important;
        }

        .mdc-floating-label {
            left: 48px;
            right: auto;
        }

        .mdc-notched-outline__notch {
            .mdc-floating-label {
                left: 36px;
                right: auto;
            }
        }

    }

    //righticon
    .mdc-text-right-icon {
        .mdc-text-field__input {
            padding-left: 16px !important;
            padding-right: 48px !important;
        }

        .mdc-text-field__icon {
            @include field-icon;
            left: auto;
            right: 12px;
        }
    }
    
}
</style>
