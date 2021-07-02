import React from 'react';
import { Dropdown, Form, Segment, Label, Icon, Button, Message } from 'semantic-ui-react';
import api from '../../api';
import Navbar from '../navbar/navigation/navbar';

class SettingsPage extends React.Component {
  state = {
    accordionIndex: '',
    mgmtEmployee: [],
    data: {
      selectedEmployee: [],
      fiscalYearStartMonth: '',
      fiscalYearEndMonth: '',
      fiscalStartYear: '',
      updatedFiscalYear: [],
    },
    savedFiscalYear: [],
    FiscalYearError: ''
  }

  componentDidMount = () => {
    api.user.get().then(employee => {
      let mgmtEmployee = [];
      for(let i of employee) {
        if(i.role === 'Management') {
          mgmtEmployee.push({
            text: i.email_id,
            value: i.email_id
          })
        }
      }
      this.setState({
        ...this.state,
        mgmtEmployee
      })
    })

    api.settings.get().then(settings => {
      console.log(settings)
      this.setState({
        ...this.state,
        savedFiscalYear: settings.fiscalYear,
        data: {
          ...this.state.data,
          fiscalYearStartMonth: settings.fiscalYearStartMonth,
          fiscalYearEndMonth: settings.fiscalYearEndMonth,
          selectedEmployee: settings.AdministrationMailing
        } 
      })
    })
  }

  onChangeEmpMailing = (e, data) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        selectedEmployee: data.value
      }
    })
  }

  onChangeFiscalYear = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      FiscalYearError: false,
      data: {
        ...this.state.data,
        fiscalStartYear: e.target.value
      }
    })
  }

  onClickAddFiscalYear = (e) => {
    e.preventDefault();
    if(this.state.data.fiscalStartYear > 1900) {
      let updatedFiscalYear = this.state.data.updatedFiscalYear;
      if(updatedFiscalYear.length === 0) {
        updatedFiscalYear.push(this.state.data.fiscalStartYear + '-' + (parseInt(this.state.data.fiscalStartYear) + 1));
      } else {
        let index = updatedFiscalYear.indexOf(this.state.data.fiscalStartYear + '-' + (parseInt(this.state.data.fiscalStartYear) + 1));
        if(index === -1) {
          updatedFiscalYear.push(this.state.data.fiscalStartYear + '-' + (parseInt(this.state.data.fiscalStartYear) + 1));
        }
      }
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          updatedFiscalYear: updatedFiscalYear,
          fiscalStartYear: ''
        }
      })
    } else {
      this.setState({
        ...this.state,
        FiscalYearError: true
      })
    }
  }

  onClickDeleteFiscalYear = (e, index, value) => {
    if(value === 'fiscal_year_added') {
      let updatedFiscalYear = this.state.data.updatedFiscalYear;
      updatedFiscalYear.splice(index,1);
      this.setState({
        ...this.state,
        updatedFiscalYear
      })
    } else if(value === 'saved_fiscal_year') {
      let savedFiscalYear = this.state.savedFiscalYear;
      savedFiscalYear.splice(index, 1);
      this.setState({
        ...this.state,
        savedFiscalYear
      })
    }
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    let fiscalYear = this.state.savedFiscalYear.concat(this.state.data.updatedFiscalYear.filter((item) => this.state.savedFiscalYear.indexOf(item) < 0));
    let data = {
      AdministrationMailing: this.state.data.selectedEmployee,
      fiscalYearStartMonth: this.state.data.fiscalYearStartMonth,
      fiscalYearEndMonth: this.state.data.fiscalYearEndMonth,
      fiscalYear: fiscalYear
    };
    api.settings.update(data).then(settingsres => {
      console.log(settingsres);
    })
  }

  onChange = (e, variable, data) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [variable]: data.value
      }
    })
  }

  render() {
    let months = [
      {
        text: 'January',
        value: 'January'
      },
      {
        text: 'February',
        value: 'February'
      },
      {
        text: 'March',
        value: 'March'
      },
      {
        text: 'April',
        value: 'April'
      },
      {
        text: 'May',
        value: 'May'
      },
      {
        text: 'June',
        value: 'June'
      },
      {
        text: 'July',
        value: 'July'
      },
      {
        text: 'August',
        value: 'August'
      },
      {
        text: 'September',
        value: 'September'
      },
      {
        text: 'October',
        value: 'October'
      },
      {
        text: 'November',
        value: 'November'
      },
      {
        text: 'December',
        value: 'December'
      }
    ]
    
    return(
      <div>
        <Navbar />
          <div style={{position: 'relative', top: '10px'}}>
            <p 
              style={{
                fontSize:"2rem",
                fontWeight: '900', 
                display: 'inline-block',
                position:'relative', 
                left: '50%', 
                transform: 'translateX(-50%)'
              }}>
                Settings
            </p>
            <Segment style={{marginLeft: '3%', marginRight: '3%'}}>
              <Form style={{marginLeft: '1%', marginRight: '1%'}}>
                <Form.Group>
                  <Form.Field style={{width: '100%'}} required>
                    <label>Administration Mailing</label>
                    <Dropdown 
                      placeholder="Administration Mailing"
                      fluid
                      multiple
                      search
                      selection
                      options={this.state.mgmtEmployee}
                      onChange={this.onChangeEmpMailing}
                      value={this.state.data.selectedEmployee}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field style={{width: '50%'}} required>
                    <label>Fiscal Year Month</label>
                    <Form.Group>
                      <Form.Field style={{width: '50%'}}>
                        <Dropdown 
                          placeholder="Start Month"
                          fluid
                          selection
                          options={months}
                          value={this.state.data.fiscalYearStartMonth}
                          onChange={(e, data) => {this.onChange(e, 'fiscalYearStartMonth', data)}}
                        />
                      </Form.Field>
                      to
                      <Form.Field style={{width: '50%'}}>
                      <Dropdown 
                        placeholder="End Month"
                        fluid
                        selection
                        options={months}
                        value={this.state.data.fiscalYearEndMonth}
                        onChange={(e, data) => {this.onChange(e, 'fiscalYearEndMonth', data)}}
                      />
                      </Form.Field>
                    </Form.Group>
                  </Form.Field>
                  <Form.Field required style={{width: '50%'}} error={this.state.FiscalYearError === true}>
                    <label>Fiscal Year</label>
                    <Form.Group>
                      <Form.Field style={{width: '35%'}}>
                        <input type='Number' min='1900' placeholder='2010' onChange={(e) => this.onChangeFiscalYear(e)} value={this.state.data.fiscalStartYear} />
                      </Form.Field>
                      <Form.Field style={{width: '35%'}}>
                        <input type='Number' readOnly placeholder='2011' value={parseInt(this.state.data.fiscalStartYear) + 1}/>
                      </Form.Field>
                      <Button positive style={{width: '30%'}} onClick={(e) => {this.onClickAddFiscalYear(e)}}>Add Fiscal Year</Button>
                    </Form.Group>
                  </Form.Field>
                </Form.Group>
                <br/>
                <Form.Field>
                  <label>Fiscal Years that are needed to be Saved</label>
                  {this.state.data.updatedFiscalYear.map((fiscalYear, index) => (
                    <Label as='a'>{fiscalYear}<Icon name='delete' onClick={(e) => {this.onClickDeleteFiscalYear(e, index, 'fiscal_year_added')}} /></Label>
                  ))}
                </Form.Field>
                <Form.Field>
                  <label>Saved Fiscal Years</label>
                  {this.state.savedFiscalYear.map((fiscalYear, index) => (
                    <Label as='a'>{fiscalYear}<Icon name='delete' onClick={(e) => {this.onClickDeleteFiscalYear(e, index, 'saved_fiscal_year')}} /></Label>
                  ))}
                </Form.Field>
                <Button style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} positive onClick={(e) => {this.onClickSubmit(e)}}>Save</Button>
              </Form>
              {this.state.FiscalYearError === true && (
                <Message
                  error
                  header='Fiscal Year Error'
                  content='Fiscal Year Value must be a proper value'
                />
              )}
            </Segment>
          </div>

      </div>
    )
  }
}

export default SettingsPage;