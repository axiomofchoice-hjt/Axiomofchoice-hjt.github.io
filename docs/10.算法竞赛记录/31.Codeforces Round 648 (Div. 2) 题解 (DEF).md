---
title: Codeforces Round 648 (Div. 2) 题解 (DEF)
date: 2020-06-08 09:26:00
permalink: /pages/f9bf09/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1365>

真的没时间补 ABC 了，希望我的 ddl 没事 qwqqqqqqqqqqqqqqqqqqqqq。

## D. Solve The Maze

题目大意：放几个障碍物让所有好人逃出地图，让所有坏人逃不出地图。

首先把坏人相邻的空格变成障碍物。

- 因为好人肯定不会经过坏人周围的空格（否则坏人顺着这个路逃走），还不如堵死。

然后就看所有好人是否能逃离地图，即判断好人与逃生点的连通性。判断连通性，dfs, bfs, dsu 都可。

WARNING 辣鸡代码警告。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=210; typedef long long ll;
int n,m,T;
string s[N];
bool inside(int x,int y){
    return x>=0 && y>=0 && x<n && y<m;
}
bool good(int x,int y){
    return s[x][y]=='.' || s[x][y]=='G';
}
int dn[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
queue<pair<int,int>> q;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m; repeat(i,0,n)cin>>s[i];
        int ans=true;
        repeat(x,0,n)
        repeat(y,0,m)
        if(s[x][y]=='B'){
            repeat(k,0,4){
                int px=x+dn[k][0];
                int py=y+dn[k][1];
                if(inside(px,py)){
                    if(s[px][py]=='G')ans=false;
                    if(s[px][py]=='.')s[px][py]='#';
                }
            }
        }
        if(s[n-1][m-1]=='B')ans=false;
        if(good(n-1,m-1)){
            s[n-1][m-1]='o';
            q.push({n-1,m-1});
            while(!q.empty()){
                int x=q.front().first,y=q.front().second;
                q.pop();
                repeat(k,0,4){
                    int px=x+dn[k][0];
                    int py=y+dn[k][1];
                    if(inside(px,py) && good(px,py)){
                        s[px][py]='o';
                        q.push({px,py});
                    }
                }
            }
        }
        repeat(i,0,n)
        repeat(j,0,m)
        if(s[i][j]=='G')
            ans=false;
        cout<<(ans?"Yes":"No")<<endl;
    }
    return 0;
}
```

## E. Maximum Subsequence Value

题目大意：选取长度为 `k` 的子序列，定义子序列的 value 为，对于二进制的某一位，子序列中该位为 1 的个数大于等于 `max(1,k-2)`，那么 value 的该位也为 1。求所有子序列中 value 最大值。

（~~猛男 zkx 告诉我~~）很显然，只要 `k <= 3` 的情况即可。因为对于长度为 4 的子序列 value 小于等于去掉一个元素后的子序列的 value（~~读者自证不难~~）。

然后 3 个 for 搞定。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=510; typedef long long ll;
#define int ll
int n,a[N],ans;
signed main(){
    cin>>n;
    repeat(i,0,n)cin>>a[i];
    repeat(i,0,n)
    repeat(j,i,n)
    repeat(k,j,n)
        ans=max(ans,a[i]|a[j]|a[k]);
    cout<<ans<<endl;
    return 0;
}
```

## F. Swaps Again

题目大意：问是否经过多次操作可以让数组 `a` 变成数组 `b`。操作为，交换区间 `[1,k]` 和 `[n-k+1,n]`，`(1 <= k <= floor(n/2))`。

（~~猛男 zkx 又告诉我~~）很显然，对于对称的两个数（`a[i]` 和 `a[n-i+1]`），经过任意操作后，它俩还是对称的。（当然了，交换它俩还是允许的）这就很厉害了，只要把对称的数捆绑在一起，用一下 set/map 或者排个序都是可以的，~~这道 F 题也就很容易地被我们切掉了~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=510; typedef long long ll;
int n,a[N],b[N],T;
map<pair<int,int>,int> mp;
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        repeat(i,0,n)cin>>b[i];
        int ans=true; mp.clear();
        if(n%2==1 && a[n/2]!=b[n/2])ans=false;
        repeat(i,0,n/2){
            int x,y;
            x=a[i],y=a[n-i-1];
            if(x>y)swap(x,y);
            mp[{x,y}]++;
            x=b[i],y=b[n-i-1];
            if(x>y)swap(x,y);
            mp[{x,y}]--;
        }
        for(auto i:mp)if(i.second!=0)ans=false;
        cout<<(ans?"Yes":"No")<<endl;
    }
    return 0;
}
```
