---
title: Codeforces 1305 (div1+div2) 题解 (ABCDEFG)
date: 2020-03-04 22:51:00
permalink: /pages/86938b/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1305)

div1,2 合场。我感觉这次比赛总体不难，考察思维为主。

思维卡住了（~~比如说我~~）就很惨了。

## A. Kuroni and the Gifts

签到，略。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
typedef long long ll;
ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=100010;
int a[N],b[N];
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int t=read();
    while(t--){
        int n=read();
        repeat(i,0,n)a[i]=read();
        repeat(i,0,n)b[i]=read();
        sort(a,a+n); sort(b,b+n);
        repeat(i,0,n)printf("%d ",a[i]); puts("");
        repeat(i,0,n)printf("%d ",b[i]); puts("");
    }
    return 0;
}
```

## B. Kuroni and Simple Strings

这题据我所知有三种做法，对应三种复杂度。

题目突破口就是找到临界位置，这个位置左边的 `'('` 全部删除，`')'` 全部保留，位置右边正好反一下。

第一种像我一样枚举临界位置，$O(n^2)$。

第二种也是算临界位置，但是用二分优化，$O(n\log n)$。

第三种用左右指针逼近，相遇点即临界位置，$O(n)$。

（~~第一种最好写所以想都没想就开莽了~~）

（~~大力出奇迹~~）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
string s;
int count(int l,int r,char c){ //在区间[l,r]内有多少个字符c
    int ans=0;
    repeat(i,l,r+1)
        ans+=s[i]==c;
    return ans;
}
void print(int l,int r,char c){ //输出区间[l,r]内所有字符c的位置
    repeat(i,l,r+1)
    if(s[i]==c)
        cout<<i+1<<' ';
}
int len;
int solve(){ //找到临界位置
    cin>>s;
    len=s.length();
    repeat(i,-1,len){
        if(count(0,i,'(')==count(i+1,len-1,')'))
            return i;
    }
    return -1; //程序根本不会运行到这里所以请忽略，只是为了防止烦人的编译器警告
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int p=solve(),cnt=count(0,p,'(');
    if(cnt==0)cout<<0<<endl;
    else{
        cout<<1<<endl;
        cout<<cnt*2<<endl;
        print(0,p,'(');
        print(p+1,len-1,')');
    }
    return 0;
}
```

## C. Kuroni and Impossible Calculation

（~~学长：你看这个 m 的范围就没有一点想法吗~~）

想法就是开 1000 个桶把数据放进去，然后暴力 $O(m^2)$ 解决问题。

（~~大力出奇迹~~）\*2

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll;
const int N=200010;
int a[N],h[N],cnt[N];
int n,m;
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n>>m;
    repeat(i,0,n)cin>>a[i],cnt[a[i]%m]++,h[a[i]%m]=a[i];
    repeat(i,0,m)if(cnt[i]>1)cout<<0<<endl,exit(0);
    ll ans=1%m;
    repeat(i,0,m)
    if(cnt[i])
    repeat(j,i+1,m)
    if(cnt[j]){
        if(h[i]>h[j])
            ans=ans*(i-j)%m;
        else
            ans=ans*(j-i)%m;
    }
    cout<<(ans+m)%m<<endl;
    return 0;
}
```

## D. Kuroni and the Celebration

这是一道交互题，熟悉交互题的写法对打 cf 还是很有帮助的。

因为要在 $\lfloor \dfrac n 2 \rfloor$ 次询问内解决问题，所以每次询问都排除至少两个点就可以完成任务。

因此假如 $x$ 和 $y$ 之间有边，$y$ 和 $z$ 之间有边，那么询问 $x,z$ 一定可以至少排除两个点（我们可以砍掉这两条边，询问范围缩小到 $lca(x,z)$ 所在的子图中）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll;
const int N=1010;
int n; set<int> a[N]; //用set存不常见，注意风险
int x,ans;
void q(){
    if(a[x].empty()){ //如果x没边了
        cout<<"! "<<x<<endl;
        exit(0);
    }
    int y=*a[x].begin();
    if(a[x].size()==1 && a[y].size()==1){ //如果x只连y，y只连x
        cout<<"? "<<x<<' '<<y<<endl;
        cout.flush();
        cin>>ans;
        cout<<"! "<<ans<<endl;
        exit(0);
    }
    if(a[y].size()==1){ //如果y只有一条边（找不到z）就把y当成x，重新来一次
        x=y;
        return;
    }
    int z=*a[y].begin();
    if(z==x)z=*(++a[y].begin());
    cout<<"? "<<x<<' '<<z<<endl;
    cout.flush();
    cin>>ans;
    //砍边时刻
    a[x].erase(y);
    a[y].erase(x);
    a[y].erase(z);
    a[z].erase(y);
    x=ans;
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n;
    repeat(i,0,n-1){
        int x,y; cin>>x>>y;
        a[x].insert(y);
        a[y].insert(x);
    }
    x=1;
    while(1)q();
    return 0;
}
```

## E. Kuroni and the Score Distribution

（~~令人智熄的~~构造题）

首先构造出平衡数最大的序列：$1,2,...,n$。

然后我们试着往后移动 $n$ 发现 $n$ 每加 $2$ ，平衡数会减 $1$。

（~~我一直以为 n+1，平衡数+1，一直到比赛结束，呜呜~~）

当然如果 $n$ 移到很远的地方平衡数就不会变了。

这时我们就要移动 $n-1$。

为了避免冲突，我们将“很远”的位置从 $9e8$ 开始每 $1e4$ 放置一个数。

比如我要放 $3$ 个数到很远的位置就放在 $800000000,800010000,800020000$。

（为什么要 $1e4$ 这么多呢，因为我可以保证前面任意一个数都小于 $1e4$）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; 
const int N=1010;
int n,m;
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n>>m;
    repeat(i,1,n+1){
        int l=i%2,r=i-2;
        int s=(l+r)*(r-l+2)/4;
        if(s>=m){
            repeat(j,1,i)cout<<j<<' ';
            cout<<i+(s-m)*2<<' ';
            int k=9e8;
            repeat(j,0,n-i)
                cout<<k<<' ',k+=10000;
            exit(0);
        }
    }
    cout<<-1<<endl;
    return 0;
}
```

## F. Kuroni and the Punishment

随机化？！

随机化可以说是相当~~玄学，玄学中的玄学~~精彩的算法了。

我们先对 $a_i$ 洗牌，洗完后取前 $30$ 个数 $^1$，再取与这些数 $^1$ 绝对值相差 $1$ 以内的所有数 $^2$，再取这些数 $^2$ 的所有质因数 $^3$，再把这些数 $^3$ 当成公因数 for 一遍来更新答案。

可以发现，如果公因数是 $2$ 或者 $3$，取 $1$ 个数也无所畏惧；如果是 $4$ ，那么要让我取不到公因数的办法只能让尽量多的数模 $4$ 余 $2$ 而且答案一定要小于 $n$，这意味着至少一半的数模 $4$ 不余 $2$，算法也就只有大约 $2^{-30}$ 的错误概率，~~真是巧妙~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2;
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010;
#define int ll
set<int> s;
int n,a[N];
void fac(int n){
    for(int i=2;i*i<=n;i++)
    if(n%i==0){
        s.insert(i);
        while(n%i==0)n/=i;
    }
    if(n>1)s.insert(n);
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n;
    repeat(i,0,n)cin>>a[i];
    repeat_back(i,3,n)swap(a[i],a[rnd()%i]);
    repeat(i,0,min(30ll,n)){
        fac(a[i]);
        fac(a[i]+1);
        fac(a[i]-1);
    }
    int ans=inf;
    for(auto d:s){
        int now=0;
        repeat(i,0,n){
            if(a[i]<d)now+=d-a[i];
            else now+=min(a[i]%d,d-a[i]%d);
        }
        ans=min(ans,now);
    }
    cout<<ans<<endl;
    return 0;
}
```

## G. Kuroni and Antihype

（~~人生第一次补 G 题~~）

事实上看光代码也能理解思路，~~雾~~。

我们先加一个成员 0。

显然成员关系会是一个图，如果发生邀请，我们将这条边涂上红色。

定义边权等于端点点权之和。

由于不能重复邀请，红色边构成了一棵树，且恰好 所有边权之和 减去 所有点权之和 就是这个方案的临时答案（~~这个结论谁想得到啊~~）。

所以最终只要跑个最大生成树，用 $s$ 从大到小遍历边权，然后遍历 $s$ 的二进制子集，DSU 维护连通。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll;
const int N=1<<18;
struct DSU{ //合并：d[x]=d[y]，查找：d[x]==d[y]
    int a[N];
    void init(int n){iota(a,a+n+1,0);}
    int &operator[](int x){
        return a[x]==x?a[x]:(a[x]=(*this)[a[x]]);
    }
}d;
ll ans=0;
int n,cnt[N],vis[N];
int getcnt(int x){
    if(vis[x])return 1;
    vis[x]=1;
    return cnt[x];
}
int connect(int x,int p){
    x=d[x]; p=d[p]; if(x==p)return 0;
    d[x]=p;
    return getcnt(x)+getcnt(p)-1;
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n;
    d.init(N-1);
    repeat(i,0,n){
        int x; cin>>x;
        cnt[x]++;
        ans-=x;
    }
    cnt[0]++;
    repeat_back(s,0,N)
    for(int x=s;x;x=(x-1)&s){ //遍历子集
        int p=s^x; //x,p可以互相邀请，他们的边权为s
        if(cnt[x] && cnt[p]){
            ans+=(ll)s*connect(x,p);
        }
    }
    cout<<ans<<endl;
    return 0;
}
```
