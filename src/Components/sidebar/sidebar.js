import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faCalendar,
  faMessage,
  faChartBar,
  faChartArea,
  faPencilAlt,
  faTh,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './sidebar.css'; 

// Manager
const Sidebar = () => {
  return (
    <div className="sidebar" style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#524545" backgroundColor="#e4e4e4" breakpoint={720}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Budget/Calculation</CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/createBudget" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faTh} className="sidebar-icon" />
                Add Budget
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/UserBudgets" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faMessage} className="sidebar-icon" />
                budget list
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/categorySpendingPercentage" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
                Budget Calculation
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/CreatePortfolio" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
                Create Portfolio
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/CreateInvestment" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
                Create Investment
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/calculateFutureValue" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faHistory} className="sidebar-icon" />
                Investment Future Value
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/LoanEmi" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
                Loan EMI Calculation
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;