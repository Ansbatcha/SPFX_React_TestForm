import * as React from 'react';
import styles from './TestFormCreation.module.scss';
import { ITestFormCreationProps } from './ITestFormCreationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { addMonths, addYears } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const today: Date = new Date(Date.now());
const minDate: Date = addMonths(today, -1);
const maxDate: Date = addYears(today, 1);

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.',
  isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});
export interface TestFormExampleState {
  firstDayOfWeek?: DayOfWeek;
  showError: boolean;
  value: null;
  
}
export default class TestFormCreation extends React.Component<ITestFormCreationProps> 
{
  public state;
  constructor(props) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      showError:false,
      value:null
      
    };
  }
  public _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
  }
  public _onChangeToggle(ev: React.MouseEvent<HTMLElement>, checked: boolean){
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }
  private _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };
  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ value: date });
  };
  public render() {
    return (
      
      <div className={ styles.testFormCreation }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <p className={ styles.subTitle }>Testing Form with all fields</p>
            </div>
          </div>
          <div className={ styles.row }>
     
          <TextField className={styles.title} required={true} label="Title" />
          </div>
          <div className={ styles.row }>
   
          <Dropdown
          placeholder="Select an option"
          label="Gender"
          options={[
            { key: 'A', text: 'Male' },
            { key: 'B', text: 'Female' },
            { key: 'C', text: 'Transgender' },
            
          ]}
          errorMessage={this.state.showError ? 'This dropdown has an error' : undefined}
          styles={{ dropdown: { width: 300 }, root: { height: 100 } }}
        />
          </div>
       
          <div className={ styles.row }>
          <ChoiceGroup
      className={styles.title}
      defaultSelectedKey="A"
      options={[
        {
          key: 'A',
          text: 'Junior Developer'
        },
        {
          key: 'B',
          text: 'Software Engineer'
        },
        {
          key: 'C',
          text: 'Senior Developer',
          
        },
        {
          key: 'D',
          text: 'Technical Lead'
        }
      ]}
      onChange={this._onChange}
      label="Select Designation : "
     
    />
          </div>
          <div className={styles.row}>
          <DatePicker
          className={controlClass.control}
          isRequired={true}
          label="Select the Start Date"
          firstDayOfWeek={this.state.firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          value={this.state.value!}
        
          formatDate={this._onFormatDate}
          minDate={minDate}
          maxDate={maxDate}
          allowTextInput={true}
        />
          </div>
          <div className={styles.row}>
          <DatePicker
          className={controlClass.control}
          isRequired={true}
          label="Select the End Date"
          firstDayOfWeek={this.state.firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          value={this.state.value!}
        
          formatDate={this._onFormatDate}
          minDate={minDate}
          allowTextInput={true}
        />
          </div>
          <div className={styles.row}>
          <PeoplePicker
                        context={this.props.context}
                        titleText="Select People : "
                        personSelectionLimit={1}
                        // showtooltip={true}
                         selectedItems={
                          (this._getPeoplePickerItems = (items): void => {
                            this.setState({ selectedItem: items });
                          })
                        }
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000}
                      />
          </div>
          <div className={styles.row}>
          <Toggle label="Before worked with us : " onText="Yes" offText="No" onChange={this._onChangeToggle} />
          </div>
        </div>
      </div>
    );
  }

}
