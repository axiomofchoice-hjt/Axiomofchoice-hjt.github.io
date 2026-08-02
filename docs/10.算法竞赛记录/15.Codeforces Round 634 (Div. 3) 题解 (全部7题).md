---
title: Codeforces Round 634 (Div. 3) 题解 (全部7题)
date: 2020-04-14 09:04:00
permalink: /pages/fd3680/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1335)

## A. Candies and Two Sisters

凑一凑大概是 $\dfrac{n-1}2$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int n;
signed main(){
    int T=read();
    while(T--){
        int n=read();
        cout<<(n-1)/2<<endl;
    }
    return 0;
}
```

## B. Construct the String

比较简单的方法是 $b$ 个字符一循环。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
string s;
signed main(){
    int T=read();
    while(T--){
        int n=read(),a=read(),b=read();
        s=""; repeat(i,0,b)s+=char('a'+i);
        while(n){
            int t=min(n,b);
            repeat(i,0,t)putchar(s[i]);
            n-=t;
        }
        puts("");
    }
    return 0;
}
```

## C. Two Teams Composing

统计互不相同的数字个数 $A$，以及众数出现次数 $B$，输出 $\max(\min(A-1,B),\min(A,B-1))$，因为要么 $A$ 送半个给 $B$ 要么反过来。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
map<int,int> Map;
signed main(){
    int T=read();
    while(T--){
        int n=read(); Map.clear();
        repeat(i,0,n)Map[read()]++;
        int m=0,cnt=0;
        for(auto i:Map){
            cnt++;
            m=max(m,i.second);
        }
        cout<<max(min(cnt-1,m),min(cnt,m-1))<<endl;
    }
    return 0;
}
```

## D. Anti-Sudoku

所有的 1 变成 2，别问我为什么。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
string s;
signed main(){
    int T; cin>>T;
    while(T--){
        repeat(i,0,9){
            cin>>s;
            s[s.find('1')]='2';
            cout<<s<<endl;
        }
    }
    return 0;
}
```

## E2. Three Blocks Palindrome (hard version)

有点考验代码功底。

首先要弄出一个暴力算法，就是枚举左指针、右指针、元素种类 x、元素种类 y，然后统计 min(左指针左边的 x 个数, 右指针右边的 x 个数) + 俩指针之间 y 的个数，更新答案。

这样复杂度是 $O(n^3\cdot200^2)$（我故意弄得这么暴力）。

统计个数可以用前缀和数组实现， $O(n^2\cdot200^2)$。

然后右指针可以用二分查找实现，因为多了少了都浪费（都在其他情况下统计过了），即先确定左指针，然后在前缀和中查找右指针，其右边 x 的个数恰好和左边一样， $O(n(\log n+200)\cdot200)$。

还是过不了，进一步思考，发现左指针如果移动了一格，需要考虑更新的答案只有左指针移动后指向的元素种类（其他元素种类不用考虑，之前考虑过），这样优化到正确的复杂度 $O(n(\log n+200))$。

当然如果反过来记录前缀和与位置的关系可以优化到 $O(200n)$ 但是我没有(doge)。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
//#define int ll
int a[N],s[201][N];
signed main(){
    int T=read();
    while(T--){
        int n=read();
        repeat(i,1,n+1)a[i]=read();
        repeat(c,1,200+1)
            s[c][n+1]=0;
        repeat(c,1,200+1)
        repeat_back(i,1,n+1)
            s[c][i]=s[c][i+1]+(a[i]==c);
        int ans=1;
        repeat(i,1,n+1){
            int c=a[i];
            int pre=s[c][1]-s[c][i+1];
            int p2=upper_bound(s[c]+1,s[c]+n+1,pre,greater<int>())-s[c]-1;
            
            if(p2>i)
            repeat(c2,1,200+1)
                ans=max(ans,s[c2][i+1]-s[c2][p2]+2*pre);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## F. Robots on a Grid

有点考验代码功底+1。

首先所有格子出度为 1，很容易发现这是一个基环内向树（我也是刚学的这个名词）。

因此我们可以把格子映射到整数（好弄一点），构建出一个这样的图。每个点必然最终会走进一个环内，因此可以从某些点出发不断走，直到访问的点被访问过，找出所有环，记录环长。

这样第一问解决了。

第二问问的是黑格子里最多放几个机器人，因此每个环中都要设定一个原点，然后考虑环所在的基环内向树，计算每个点走到原点需要走几步，显然要求(这些步数对环长取模后)两两不相等（不然走到原点就撞），因此贪心地多多益善即可。

辣鸡代码警告（感觉写了注释还是看不懂，就瞎写了）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1000010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
typedef pair<int,int> pii;
map<int,pii> dir={{'L',{0,-1}},{'R',{0,1}},{'U',{-1,0}},{'D',{1,0}}};
int n,m;
vector<int> a[N]; //这个存的是反图，上一步
inline int f(int x,int y){return x*m+y;}
int vis[N]; //带时间戳的vis
bool val[N]; //是否为黑色格子
int to[N],co[N],start[N],len[N],dis[N]; //to是下一步，co是环的id，start是是否为原点，len是某id的环长，dis是走到原点的距离+1
string s;
int dcnt,cocnt,ans1,ans2; //dcnt是vis的时间戳，cocnt是当前环的id
//#define orzz(a) []{cout<<"*****"#a"*****:"<<endl;repeat(i,0,n)repeat(j,0,m)cout<<a[f(i,j)]<<" \n"[j==m-1];}()
void work1(int x0){
    int x=x0;
    dcnt++;
    while(vis[x]==0){
        vis[x]=dcnt;
        x=to[x];
    }
    if(vis[x]==dcnt){
        cocnt++; len[cocnt]=0;
        while(co[x]==0){
            len[cocnt]++;
            ans1++;
            co[x]=cocnt;
            x=to[x];
        }
        start[x]=1;
    }
}
queue<int> q;
bool bkt[N];
void work2(int x0){
    dis[x0]=1;
    q.push(x0);
    int nowco=co[x0];
    int nowlen=len[nowco];
    fill(bkt,bkt+nowlen,0);
    while(!q.empty()){
        int x=q.front(); q.pop();
        if(val[x] && bkt[dis[x]%nowlen]==0){
            ans2++;
            bkt[dis[x]%nowlen]=1;
        }
        for(auto p:a[x]){
            if(dis[p]==0){
                dis[p]=dis[x]+1;
                q.push(p);
            }
        }
    }
}
signed main(){
    int T; cin>>T;
    while(T--){
        cin>>n>>m; cocnt=dcnt=0; ans1=ans2=0;
        fill(vis,vis+n*m,0);
        fill(co,co+n*m,0);
        fill(dis,dis+n*m,0);
        fill(start,start+n*m,0);
        repeat(i,0,n){
            cin>>s;
            repeat(j,0,m)val[f(i,j)]=(s[j]!='1');
        }
        repeat(i,0,n){
            cin>>s;
            repeat(j,0,m)
                to[f(i,j)]=f(i+dir[s[j]].first,j+dir[s[j]].second);
        }
        repeat(i,0,n*m)if(vis[i]==0)work1(i);
        repeat(i,0,n*m)a[i].clear();
        repeat(i,0,n*m)a[to[i]].push_back(i);
        repeat(i,0,n*m)if(start[i])work2(i);
        cout<<ans1<<' '<<ans2<<endl;
    }
    return 0;
}
```
