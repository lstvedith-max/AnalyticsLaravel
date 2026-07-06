import React, { useState } from 'react';
import {
  Users, UserMinus, UserPlus, TrendingUp, FileCheck, Search, Filter,
  Calendar, MoreHorizontal, DollarSign, Clock, AlertCircle,
  BarChart3, Wallet, ShieldCheck, MapPin, CalendarDays,
  Briefcase, Fingerprint, PieChart as PieIcon, FileWarning,
  Award, ArrowUpRight, ArrowDownRight,
  UsersIcon
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, ComposedChart
} from 'recharts';

// --- Global Styling Constants (Updated for HR Connect) ---
const COLORS = ['#054d32', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
const THEME = {
  sidebar: 'bg-[#054d32]', // The specific dark green in your image
  sidebarActive: 'bg-[#043d28]',
  cardBg: 'bg-white',
  pageBg: 'bg-slate-50',
  accent: 'text-[#054d32]',
};
// --- Enhanced Mock Data ---
const workforceTrends = [
  { month: 'Oct', headcount: 185, attrition: 2.1, hiring: 3.2, payroll: 450000, salary: 380000, allowances: 28000, ot: 42000, att: 94, otRatio: 9.3 },
  { month: 'Nov', headcount: 188, attrition: 1.8, hiring: 4.1, payroll: 465000, salary: 390000, allowances: 30000, ot: 45000, att: 95, otRatio: 9.6 },
  { month: 'Dec', headcount: 191, attrition: 2.5, hiring: 4.8, payroll: 520000, salary: 410000, allowances: 42000, ot: 68000, att: 92, otRatio: 13.1 },
  { month: 'Jan', headcount: 194, attrition: 1.2, hiring: 3.5, payroll: 470000, salary: 405000, allowances: 27000, ot: 38000, att: 97, otRatio: 8.1 },
  { month: 'Feb', headcount: 198, attrition: 1.0, hiring: 3.9, payroll: 485000, salary: 415000, allowances: 29000, ot: 41000, att: 98, otRatio: 8.4 },
  { month: 'Mar', headcount: 201, attrition: 1.5, hiring: 4.2, payroll: 498000, salary: 425000, allowances: 29000, ot: 44000, att: 96, otRatio: 8.8 },
];

const deptComposition = [
  { name: 'Engineering', hc: 65, compliance: 98, assets: 120, otHours: 140 },
  { name: 'Operations', hc: 48, compliance: 82, assets: 210, otHours: 310 },
  { name: 'Sales', hc: 32, compliance: 90, assets: 45, otHours: 85 },
  { name: 'HR', hc: 12, compliance: 100, assets: 15, otHours: 12 },
  { name: 'Finance', hc: 15, compliance: 95, assets: 20, otHours: 25 },
  { name: 'Marketing', hc: 29, compliance: 88, assets: 35, otHours: 65 },
];

const demographics = {
  status: [{ name: 'Regular', value: 165 }, { name: 'Probationary', value: 36 }],
  gender: [{ name: 'Female', value: 105 }, { name: 'Male', value: 96 }],
  workSetup: [
    { name: 'On-site', value: 120 },
    { name: 'Remote', value: 45 },
    { name: 'Hybrid', value: 36 },
  ],
  rank: [
    { name: 'Executive', value: 5 },
    { name: 'Manager', value: 15 },
    { name: 'Supervisor', value: 25 },
    { name: 'Rank & File', value: 156 }
  ],
  age: [
    { range: '18-25', value: 45 },
    { range: '26-35', value: 88 },
    { range: '36-45', value: 42 },
    { range: '46+', value: 26 },
  ],
  tenure: [
    { range: '< 1 Year', value: 42 },
    { range: '1-3 Years', value: 85 },
    { range: '3-5 Years', value: 54 },
    { range: '5+ Years', value: 20 },
  ],
  hometown: [
    { name: 'Metro Manila', value: 130 },
    { name: 'Cavite', value: 25 },
    { name: 'Laguna', value: 20 },
    { name: 'Bulacan', value: 15 },
    { name: 'Others', value: 11 },
  ],

  civilStatus: [
    { name: 'Single', value: 110 },
    { name: 'Married', value: 85 },
    { name: 'Others', value: 6 }
  ]
};

const topExceptions = {
  birthdays: [
    { name: 'John Doe', date: 'Mar 12', dept: 'Engineering' },
    { name: 'Sarah Lee', date: 'Mar 18', dept: 'Operations' },
    { name: 'Mike Ross', date: 'Mar 25', dept: 'Legal' },
  ],
  anniversaries: [
    { name: 'Jane Smith', years: '5 Years', date: 'Mar 05', dept: 'HR' },
    { name: 'Harvey Specter', years: '10 Years', date: 'Mar 21', dept: 'Legal' },
  ]
};

// --- Sub-components ---

const KPICard = ({ title, value, subtext, trend, icon: IconComponent, colorClass, sparklineData }) => (
  <div className="bg-white/40 backdrop-blur-lg border-white/40 p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <IconComponent size={20} className="text-white" />
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">{subtext}</span>
      </div>
    </div>
    {sparklineData && (
      <div className="h-10 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <Area type="monotone" dataKey="val" stroke="currentColor" fillOpacity={0.1} className={trend >= 0 ? 'text-emerald-500' : 'text-rose-500'} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

const ChartCard = ({ title, children, className = "", subtitle }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">{title}</h3>
        {subtitle && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
    <div className="h-64 w-full">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: IconComponent }) => (
  <div className="flex items-center gap-3 mb-6 mt-10 first:mt-0">
    {IconComponent && <IconComponent className="text-blue-600" size={20} />}
    <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">{title}</h2>
    <div className="flex-grow h-px bg-slate-200"></div>
  </div>
);
const ExceptionTable = ({ title, data, label, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-3 border-b border-slate-50 bg-slate-50/50">
      <h3 className="font-bold text-[10px] uppercase text-slate-500 tracking-wider">{title}</h3>
    </div>
    <div className="divide-y divide-slate-50">
      {data.map((item, i) => (
        <div key={i} className="p-3 flex justify-between items-center">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{item.n}</p>
            <p className="text-[9px] text-slate-400 font-medium">{item.d}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-black ${color}`}>{item.v}</p>
            <p className="text-[8px] uppercase font-bold text-slate-300">{label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default function App() {
  const [activeTab, setActiveTab] = useState('hr');
  const [demoTab, setDemoTab] = useState('gender');
  const [payrollHidden, setPayrollHidden] = useState({});
  const [otHidden, setOtHidden] = useState({});
  const [hrHidden, setHrHidden] = useState({});
  const togglePayrollSeries = (e) => {
    const key = e.dataKey;
    setPayrollHidden(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOtSeries = (e) => {
    const key = e.dataKey;
    setOtHidden(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleHrSeries = (e) => {
    const { dataKey } = e;
    setHrHidden(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };
  const CombinedKPICard = ({ title, metrics, icon: IconComponent, colorClass }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClass} text-white`}>
          <IconComponent size={20} />
        </div>
        <h3 className="text-slate-800 font-bold text-[11px] uppercase tracking-widest">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
        {metrics.map((m, i) => (
          <div key={i} className={i > 0 ? "pl-4" : ""}>
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{m.value}</span>
              {m.trend && (
                <span className={`text-[10px] font-bold flex items-center ${m.trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {m.trend > 0 ? '▲' : '▼'} {Math.abs(m.trend)}%
                </span>
              )}
            </div>
            {m.sparkData && (
              <div className="h-8 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.sparkData}>
                    <Area type="monotone" dataKey="val" stroke={m.color} fill={m.color} fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const MiniCard = ({ label, value, icon: Icon, colorClass }) => (
    <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
        <p className={`text-lg font-black ${colorClass}`}>{value}</p>
      </div>
      <Icon size={16} className="text-slate-300" />
    </div>
  );
  const renderLegendText = (isHiddenState) => (value, entry) => {
    const isHidden = isHiddenState[entry.dataKey];

    return (
      <span style={{
        color: isHidden ? '#94a3b8' : '#475569',
        textDecoration: isHidden ? 'line-through' : 'none',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        marginLeft: '6px',
        userSelect: 'none'
      }}>
        {value}
      </span>
    );
  };
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4">              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Sample Analytics</h1>
          </div>

          <nav className="flex bg-slate-200/50 backdrop-blur-md p-1 rounded-xl border border-white/20">
            <button
              onClick={() => setActiveTab('hr')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'hr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Workforce / HRIS
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'payroll' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Payroll & TKM
            </button>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm text-sm">
            <Calendar size={14} className="text-slate-500" />
            <select className="bg-transparent font-medium outline-none cursor-pointer">
              <option>March 2024</option>
              <option>Q1 2024</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
            <FileCheck size={16} /> Export
          </button>
        </div>
      </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8">

        {/* --- WORKFORCE / HRIS VIEW --- */}
        {activeTab === 'hr' && (
          <>
            <SectionHeader title="1. Workforce Overview & Trends" icon={Users} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* CARD 1: Headcount Overview */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-600 text-white">
                    <UsersIcon size={20} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-[11px] uppercase tracking-widest">Headcount Overview</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
                  <div className="pr-2">
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Global Head Count</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">201</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center">▲ 3.2%</span>
                    </div>
                    <div className="h-8 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{ val: 185 }, { val: 190 }, { val: 188 }, { val: 201 }]}>
                          <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="pl-4">
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Net Change</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">+3</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center">▲ 15%</span>
                    </div>
                    <div className="h-8 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{ val: 1 }, { val: 4 }, { val: 2 }, { val: 3 }]}>
                          <Area type="monotone" dataKey="val" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Stability & Health */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-[11px] uppercase tracking-widest">Stability & Health</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
                  <div className="pr-2">
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Attrition Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">1.5%</span>
                      <span className="text-[10px] font-bold text-rose-500 flex items-center">▼ 0.5%</span>
                    </div>
                    <div className="h-8 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{ val: 2.1 }, { val: 1.8 }, { val: 2.5 }, { val: 1.5 }]}>
                          <Area type="monotone" dataKey="val" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="pl-4">
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Retention Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">98.5%</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center">▲ 0.7%</span>
                    </div>
                    <div className="h-8 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{ val: 97.9 }, { val: 98.2 }, { val: 97.5 }, { val: 98.5 }]}>
                          <Area type="monotone" dataKey="val" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: TREND & SNAPSHOT*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

              {/* Workforce Movement Trend */}
              <div className="lg:col-span-2">
                <ChartCard title="Workforce Movement Trend">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={workforceTrends} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <YAxis yAxisId="left" orientation="left" stroke="none" tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 1400]} />
                      <YAxis yAxisId="right" orientation="right" stroke="none" tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 32]} />
                      <Tooltip />
                      <Legend verticalAlign="top" align="right" iconType="circle" onClick={toggleHrSeries} formatter={renderLegendText(hrHidden)} wrapperStyle={{ cursor: 'pointer', paddingBottom: '20px' }} />
                      <Line yAxisId="left" type="monotone" name="Headcount" dataKey="headcount" hide={hrHidden['headcount']} stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
                      <Line yAxisId="right" type="monotone" name="Attrition" dataKey="attrition" hide={hrHidden['attrition']} stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      <Line yAxisId="right" type="monotone" name="Hiring" dataKey="hiring" hide={hrHidden['hiring']} stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Yearly Snapshot */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-slate-800 text-white">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-[11px] uppercase tracking-widest">Yearly Snapshot</h3>
                </div>
                <div className="space-y-4 flex-grow flex flex-col justify-center">
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-lg flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Yearly Attrition Rate</p>
                      <p className="text-xl font-black text-rose-600">12.4%</p>
                    </div>
                    <UserMinus size={20} className="text-slate-300" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-lg flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Yearly Hiring Rate</p>
                      <p className="text-xl font-black text-emerald-600">18.2%</p>
                    </div>
                    <UserPlus size={20} className="text-slate-300" />
                  </div>
                </div>
              </div>
            </div>

            <SectionHeader title="2. Workforce Composition & Employee Insights" icon={PieIcon} />

            {/* Row 1: Primary Distributions (Dept, Status, Rank) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ChartCard title="Headcount per Department">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptComposition} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '11px' }} />
                    <Tooltip />
                    <Bar dataKey="hc" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Employment Status">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={demographics.status}
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {demographics.status.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Rank Distribution">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Optional chaining ensures it doesn't crash if data is loading */}
                  <BarChart data={demographics?.rank || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Row 2: Secondary Distributions (Tenure, Gender, Age, Work Setup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <ChartCard title="Tenure Groups">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={demographics?.tenure} stroke="none"
                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                    label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {/* Changed dataKey from 'count' to 'value' to match the data structure */}
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Gender Diversity">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={demographics?.gender}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {demographics?.gender?.map((_, i) => (
                        <Cell key={i} fill={COLORS[(i + 4) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      iconSize={12}
                      wrapperStyle={{ fontSize: '12px', fontWeight: '500', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Age Distribution">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={demographics?.age}
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      nameKey="range"
                      stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {demographics?.age?.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      iconSize={12}
                      wrapperStyle={{ fontSize: '12px', fontWeight: '500', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Work Setup">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={demographics?.workSetup}
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {demographics?.workSetup?.map((_, i) => (
                        <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      iconSize={12}
                      wrapperStyle={{ fontSize: '12px', fontWeight: '600', paddingTop: '15px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Row 3: Demographics (Hometown & Civil Status) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Hometown Distribution">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={demographics?.hometown} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} style={{ fontSize: '11px' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2dd4bf" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Civil Status">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={demographics?.civilStatus} innerRadius={50} outerRadius={70} dataKey="value" stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {demographics?.civilStatus?.map((_, i) => <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Row 4: Engagement Tables (Birthdays & Anniversaries) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-500" />
                  <h3 className="font-bold text-sm uppercase">Birthday Celebrants (March)</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Date</th><th className="px-4 py-2">Dept</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {topExceptions?.birthdays?.map((p, i) => (
                        <tr key={i} className="hover:bg-blue-50/30">
                          <td className="px-4 py-3 font-medium">{p.name}</td>
                          <td className="px-4 py-3">{p.date}</td>
                          <td className="px-4 py-3 text-slate-500">{p.dept}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex items-center gap-2">
                  <Award size={18} className="text-amber-500" />
                  <h3 className="font-bold text-sm uppercase">Work Anniversaries</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Milestone</th><th className="px-4 py-2">Date</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {topExceptions?.anniversaries?.map((p, i) => (
                        <tr key={i} className="hover:bg-amber-50/30">
                          <td className="px-4 py-3 font-medium">{p.name}</td>
                          <td className="px-4 py-3 text-amber-600 font-bold">{p.years}</td>
                          <td className="px-4 py-3 text-slate-500">{p.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <SectionHeader title="3. 201 Data Management & Compliance" icon={ShieldCheck} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

              {/* KPI Card Missing Documents */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-lg bg-rose-600">
                    <FileWarning size={20} className="text-white" />
                  </div>
                  <span className="text-[15px] font-bold px-2 py-1 rounded-full bg-rose-50 text-rose-600 flex items-center gap-1">
                    <ArrowDownRight size={12} /> 12%
                  </span>
                </div>
                <div>
                  <h3 className="text-slate-500 text-[18px] font-bold uppercase tracking-wider">Missing Documents</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-slate-900">24</p>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">Across All Employees</span>
                  </div>
                </div>
              </div>

              {/* 201 Compliance per Department */}
              <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-8">
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-500 uppercase mb-6">201 Compliance per Department</h3>
                  <div className="space-y-4">
                    {deptComposition.slice(0, 4).map((d, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-700">{d.name}</span>
                          <span className={d.compliance >= 90 ? 'text-emerald-600' : 'text-amber-600'}>{d.compliance}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${d.compliance >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${d.compliance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doughnut Chart */}
                <div className="hidden lg:flex flex-col items-center justify-center relative w-36 h-36 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ v: 92 }, { v: 8 }]} innerRadius={42} outerRadius={55} dataKey="v" startAngle={90} endAngle={450} stroke="none">
                        <Cell fill="#10b981" />
                        <Cell fill="#f1f5f9" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Overall</span>
                    <span className="text-xl font-black text-slate-800 leading-none">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Document Inventory & Asset Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* 3. 201 Document Inventory (NBI, Health, Diploma, etc.) */}
              <ChartCard title="201 Document Inventory" subtitle="Availability per Document Type">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'NBI Clearance', available: 195 },
                    { name: 'Health Cert', available: 180 },
                    { name: 'Diploma/TOR', available: 188 },
                    { name: 'Gov IDs', available: 201 },
                    { name: 'Contract', available: 198 }
                  ]} layout="vertical">
                    <XAxis type="number" hide domain={[0, 201]} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} style={{ fontSize: '11px' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="available" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={15} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* 4. Asset per Department (Laptops, Mobile, etc.) */}
              <ChartCard title="Assets per Department" subtitle="Accountability Tracking">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptComposition}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} hide />
                    <Tooltip />
                    <Bar dataKey="assets" fill="#475569" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        )}

        {/* --- PAYROLL & TKM VIEW --- */}
        {activeTab === 'payroll' && (
          <>
            {/* 1. EXECUTIVE OVERVIEW */}
            <SectionHeader title="Executive Overview" icon={TrendingUp} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KPICard title="Total Headcount" value="201" subtext="Active Employees" icon={Users} colorClass="bg-emerald-600" />
              <KPICard title="YTD Payroll Cost" value="₱2.94M" subtext="Annual Total" trend={4.1} icon={Wallet} colorClass="bg-slate-800" sparklineData={[{ val: 450 }, { val: 465 }, { val: 520 }, { val: 470 }, { val: 480 }]} />
              <KPICard title="Avg Attendance" value="96.2%" subtext="Workforce Punctuality" trend={1.2} icon={Clock} colorClass="bg-blue-600" />
              <KPICard title="Monthly Attrition" value="1.2%" subtext="Retention Health" trend={-0.5} icon={UserMinus} colorClass="bg-rose-500" />
            </div>

            <SectionHeader title="Payroll Analytics" icon={DollarSign} />
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  {/* 1. Payroll Cost Trend */}
  <ChartCard title="PAYROLL COST – MONTHLY TREND">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={workforceTrends}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₱${val/1000}k`} />
        <Tooltip formatter={(val) => `₱${val.toLocaleString()}`} />
        <Line type="monotone" dataKey="payroll" stroke="#054d32" strokeWidth={3} dot={{r:4}} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 2. Payroll Monthly Breakdown */}
  <ChartCard title="PAYROLL MONTHLY BREAKDOWN" subtitle="Click legend to hide/show categories">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={workforceTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₱${val / 1000}k`} />
                    <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
 
                    {/* Updated Legend with toggle and strike-through */}
                    <Legend
                      onClick={togglePayrollSeries}
                      formatter={renderLegendText(payrollHidden)}
                      iconType="circle"
                    />
                    <Bar dataKey="salary" name="Basic Salary" hide={payrollHidden['salary']} fill="#1e293b" stackId="a" />
                    <Bar dataKey="allowances" name="Allowances" hide={payrollHidden['allowances']} fill="#3b82f6" stackId="a" />
                    <Bar dataKey="ot" name="Overtime Pay" hide={payrollHidden['ot']} fill="#f59e0b" stackId="a" />
                  </BarChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 3. Salary Distribution by Dept */}
  <ChartCard title="SALARY DISTRIBUTION BY DEPT">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
      <Pie 
        data={deptComposition} dataKey="hc" nameKey="name" 
        innerRadius={65} outerRadius={85} paddingAngle={2}
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {deptComposition.map((_, i) => <Cell key={i} fill={['#1e293b', '#3b82f6', '#f59e0b'][i % 3]} stroke="none" />)}
      </Pie>
      <Tooltip />
      <Legend iconType="rect" />
    </PieChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 4. Statutory Contributions */}
  <ChartCard title="STATUTORY CONTRIBUTIONS BREAKDOWN">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
      <Pie 
        data={[{name:'SSS',v:5000},{name:'PHIC',v:2000},{name:'HDMF',v:1500},{name:'Tax',v:3500}]} 
        dataKey="v" innerRadius={65} outerRadius={85} paddingAngle={2}
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {[{name:'SSS'},{name:'PHIC'},{name:'HDMF'},{name:'Tax'}].map((_, i) => (
          <Cell key={i} fill={['#10b981', '#3b82f6', '#f59e0b', '#6366f1'][i]} stroke="none" />
        ))}
      </Pie>
      <Tooltip />
      <Legend iconType="rect" />
    </PieChart>
    </ResponsiveContainer>
  </ChartCard>
</div>

{/* --- 2. TIMEKEEPING ANALYTICS GROUP --- */}
<SectionHeader title="Timekeeping Analytics" icon={Clock} />
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  {/* 1. Attendance Trends */}
  <ChartCard title="ATTENDANCE TRENDS">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={workforceTrends}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis domain={[90, 100]} axisLine={false} tickLine={false} unit="%" />
        <Tooltip /><Line type="monotone" dataKey="att" stroke="#0ea5e9" strokeWidth={3} dot={{r:4}} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 2. OT Trends Over Time */}
  <ChartCard title="OT TRENDS OVER TIME">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={workforceTrends}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="month" axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey="ot" 
        stroke="#f59e0b" 
        strokeWidth={3} 
        dot={{r: 4}} 
      />
    </LineChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 3. OT Breakdown by Type */}
  <ChartCard title="OT BREAKDOWN BY TYPE">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={[{type:'Reg',h:145},{type:'RD',h:42},{type:'Hol',h:28},{type:'Spl',h:15},{type:'Night',h:34}]} layout="vertical">
        <XAxis type="number" hide /><YAxis dataKey="type" type="category" axisLine={false} tickLine={false} />
        <Tooltip /><Bar dataKey="h" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 4 & 5. OT Utilization & Cost Ratio */}
  <ChartCard title="OT UTILIZATION & COST RATIO">
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={workforceTrends}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} unit="%" />
        <Tooltip />
        <Legend onClick={toggleOtSeries} formatter={renderLegendText(otHidden)} iconType="circle" />
        <Bar yAxisId="left" dataKey="ot" name="OT Spend (₱)" hide={otHidden['ot']} fill="#f59e0b" fillOpacity={0.3} />
                    <Line yAxisId="right" dataKey="otRatio" name="OT Cost Ratio %" hide={otHidden['otRatio']} stroke="#4f46e5" />
      </ComposedChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 6. Leave Utilization by Type */}
  <ChartCard title="LEAVE UTILIZATION BY TYPE">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={[{type:'Sick',u:45},{type:'Vacation',u:60},{type:'Emergency',u:15},{type:'Maternity',u:25}]} layout="vertical">
      <XAxis type="number" hide />
      <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} />
      <Tooltip cursor={{fill: '#f8fafc'}} />
      <Bar dataKey="u" barSize={20} radius={[0, 4, 4, 0]} fill="#64748b" />
    </BarChart>
    </ResponsiveContainer>
  </ChartCard>

  {/* 7. Leave Monthly Distribution */}
  <ChartCard title="LEAVE MONTHLY DISTRIBUTION">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
      <Pie 
        data={[{name:'Sick',v:25},{name:'Vacation',v:40},{name:'Emergency',v:15},{name:'Others',v:20}]} 
        dataKey="v" innerRadius={65} outerRadius={85} paddingAngle={2}
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {[{name:'Sick'},{name:'Vacation'},{name:'Emergency'},{name:'Others'}].map((_, i) => (
          <Cell key={i} fill={['#64748b', '#3b82f6', '#f59e0b', '#10b981'][i]} stroke="none" />
        ))}
      </Pie>
      <Tooltip />
      <Legend iconType="rect" />
    </PieChart>
    </ResponsiveContainer>
  </ChartCard>
</div>

            {/* --- 3. WORKFORCE & EXCEPTIONS --- */}
            <SectionHeader title="Workforce Trends & Exceptions" icon={AlertCircle} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 1 & 2. Movement Trends (New Hires vs Attrition) */}
              <ChartCard
                title="Movement Trends"
                subtitle="New Hires vs Attrition (6 Months)"
                className="lg:col-span-2"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workforceTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    {/* Fixed DataKeys to match your workforceTrends array */}
                    <Line type="monotone" dataKey="hiring" name="New Hires" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="attrition" name="Attrition %" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* 3. Attrition – Dept Breakdown (Monthly) */}
              <ChartCard title="Attrition by Dept" subtitle="Risk Identification (Current Month)">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptComposition}
                      dataKey="hc" // Replace with attrition-specific data if available
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      stroke="none"
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1.5 }}
                      label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {deptComposition.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* 4, 5, 6, 7. Top 5 Exceptions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              {/* Top 5 Absences */}
              <ExceptionTable
                title="Top 5 Absences"
                data={[
                  { n: 'Louis Litt', v: '4 days', d: 'Finance' },
                  { n: 'Rachel Zane', v: '3 days', d: 'Legal' },
                  { n: 'Gretchen B.', v: '2 days', d: 'HR' },
                ]}
                label="Days"
                color="text-rose-600"
              />

              {/* Top 5 Lates */}
              <ExceptionTable
                title="Top 5 Lates"
                data={[
                  { n: 'Harvey Specter', v: '12x', d: 'Legal' },
                  { n: 'Mike Ross', v: '8x', d: 'Ops' },
                  { n: 'Katrina B.', v: '5x', d: 'Legal' },
                ]}
                label="Frequency"
                color="text-amber-600"
              />

              {/* Top 5 Undertime */}
              <ExceptionTable
                title="Top 5 Undertime"
                data={[
                  { n: 'Donna Paulsen', v: '5.2h', d: 'HR' },
                  { n: 'Alex Williams', v: '4.0h', d: 'Legal' },
                ]}
                label="Total Hours"
                color="text-orange-600"
              />

              {/* Top 5 Overtime */}
              <ExceptionTable
                title="Top 5 Overtime"
                data={[
                  { n: 'Samantha W.', v: '42h', d: 'Ops' },
                  { n: 'Robert Zane', v: '38h', d: 'Legal' },
                  { n: 'Sheila S.', v: '35h', d: 'Finance' },
                ]}
                label="OT Hours"
                color="text-blue-600"
              />
            </div>
          </>
        )}
      </main>


      {/* FLOATING ACTION MENU */}
      <div className="fixed bottom-6 right-6 group">
        <div className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer relative z-10">
          <MoreHorizontal size={24} />
        </div>
        <div className="absolute bottom-full right-0 mb-4 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm shadow-lg whitespace-nowrap hover:bg-slate-50 flex items-center gap-2 text-slate-900 cursor-pointer transition-colors">
            <UserPlus size={14} /> Add 201 Record
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm shadow-lg whitespace-nowrap hover:bg-slate-50 flex items-center gap-2 text-slate-900 cursor-pointer transition-colors">
            <ShieldCheck size={14} /> Audit Compliance
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm shadow-lg whitespace-nowrap hover:bg-slate-50 flex items-center gap-2 text-slate-900 cursor-pointer transition-colors">
            <DollarSign size={14} /> Process Payroll
          </div>
        </div>
      </div>
    </div>
  );
}