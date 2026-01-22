import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit2, Save, X, Plus, Trash2, Lock, LogOut, User } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'Ahmad Hidayat', jan: true, feb: true, mar: false, apr: true, mei: false, jun: true, jul: false, agu: false, sep: false, okt: false, nov: false, des: false },
    { id: 2, name: 'Siti Nurhaliza', jan: true, feb: true, mar: true, apr: true, mei: true, jun: false, jul: false, agu: false, sep: false, okt: false, nov: false, des: false },
    { id: 3, name: 'Budi Santoso', jan: false, feb: true, mar: true, apr: false, mei: true, jun: true, jul: false, agu: false, sep: false, okt: false, nov: false, des: false },
  ]);
  const [newMember, setNewMember] = useState('');

  const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUsername('');
      setPassword('');
    } else if (username === 'user' && password === 'user123') {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
    setPassword('');
  };

  const togglePayment = (id, month) => {
    if (!isAdmin) return;
    setMembers(members.map(m => 
      m.id === id ? { ...m, [month]: !m[month] } : m
    ));
  };

  const addMember = () => {
    if (!newMember.trim()) return;
    const newId = Math.max(...members.map(m => m.id), 0) + 1;
    const newMemberObj = { id: newId, name: newMember };
    months.forEach(m => newMemberObj[m] = false);
    setMembers([...members, newMemberObj]);
    setNewMember('');
  };

  const deleteMember = (id) => {
    if (window.confirm('Yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateName = (id, newName) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, name: newName } : m
    ));
    setEditingId(null);
  };

  // Halaman Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                <Lock className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h1>
              <p className="text-gray-600">Sistem Transparansi Pembayaran Bulanan</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm animate-shake">
                  <p className="font-semibold">❌ {loginError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-lg"
              >
                🔐 Masuk
              </button>
            </form>

            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-blue-600">ℹ️</span> Akun Demo:
              </p>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-1">👨‍💼 <span className="font-semibold">Administrator</span></p>
                  <p className="font-mono text-xs bg-gray-100 px-3 py-2 rounded">Username: admin | Password: admin123</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-1">👤 <span className="font-semibold">User Biasa</span></p>
                  <p className="font-mono text-xs bg-gray-100 px-3 py-2 rounded">Username: user | Password: user123</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-white text-sm mt-6 opacity-90">
            © 2026 Sistem Transparansi Pembayaran
          </p>
        </div>
      </div>
    );
  }

  // Halaman Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📊 Transparansi Pembayaran Bulanan
              </h1>
              <p className="text-gray-600">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                    ✓ Mode Administrator
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                    👤 Mode User (Lihat Saja)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {isAdmin && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Plus className="text-green-600" size={22} />
              Tambah Anggota Baru
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMember()}
                placeholder="Nama anggota baru"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addMember}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-md"
              >
                <Plus size={20} />
                Tambah
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold sticky left-0 bg-blue-600 z-10">Nama</th>
                  {monthNames.map((m, i) => (
                    <th key={i} className="px-4 py-3 text-center font-semibold min-w-[80px]">{m}</th>
                  ))}
                  {isAdmin && <th className="px-4 py-3 text-center font-semibold">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr key={member.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium sticky left-0 bg-inherit z-10">
                      {editingId === member.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={member.name}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateName(member.id, e.target.value);
                              }
                            }}
                            className="px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {member.name}
                          {isAdmin && (
                            <button
                              onClick={() => setEditingId(member.id)}
                              className="text-blue-500 hover:text-blue-700 transition"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    {months.map((month) => (
                      <td key={month} className="px-4 py-3 text-center">
                        <button
                          onClick={() => togglePayment(member.id, month)}
                          disabled={!isAdmin}
                          className={`w-full py-2 rounded-lg font-semibold transition ${
                            member[month]
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          } ${isAdmin ? 'cursor-pointer' : 'cursor-default'} shadow-sm`}
                        >
                          {member[month] ? '✓ Lunas' : '✗ Belum'}
                        </button>
                      </td>
                    ))}
                    {isAdmin && (
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
                          title="Hapus anggota"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg p-5">
          <h3 className="font-semibold mb-3 text-gray-800">📌 Keterangan:</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded shadow-sm"></div>
              <span className="text-gray-700">Sudah Bayar (Lunas)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-100 rounded shadow-sm"></div>
              <span className="text-gray-700">Belum Bayar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;